/**
 * Animated wireframe topography background (homepage hero signature effect).
 * Requires Three.js r128 to already be loaded on the page.
 */
(function () {
    function initTopography() {
        const container = document.getElementById('canvas-container');
        if (!container || typeof THREE === 'undefined') return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;
        camera.position.y = -10;
        camera.rotation.x = Math.PI / 4;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(200, 200, 60, 60);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color('#05000a') },
                uColorEnd: { value: new THREE.Color('#7c3aed') }
            },
            vertexShader: `
                uniform float uTime;
                varying vec2 vUv;
                varying float vElevation;

                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v -   i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod289(i);
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    m = m*m ;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float elevation = sin(pos.x * 0.1 + uTime * 0.5) *
                                      sin(pos.y * 0.1 + uTime * 0.5) * 5.0;
                    elevation += snoise(vec2(pos.x * 0.05, pos.y * 0.05 + uTime * 0.2)) * 3.0;
                    pos.z = elevation;
                    vElevation = elevation;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColorStart;
                uniform vec3 uColorEnd;
                varying float vElevation;

                void main() {
                    float mixStrength = (vElevation + 5.0) / 10.0;
                    mixStrength = smoothstep(0.0, 1.0, mixStrength);
                    vec3 color = mix(uColorStart, uColorEnd, mixStrength * 0.8);
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        const clock = new THREE.Clock();

        function animate() {
            const elapsedTime = clock.getElapsedTime();
            material.uniforms.uTime.value = elapsedTime;

            const targetY = -(window.scrollY * 0.02);
            plane.position.z += (targetY - plane.position.z) * 0.1;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTopography);
    } else {
        initTopography();
    }
})();
