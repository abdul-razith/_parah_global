// Curved Text Loop Animation
(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCurvedLoop);
    } else {
        initCurvedLoop();
    }

    function initCurvedLoop() {
        const textPathEl = document.getElementById('textPath');
        const measureEl = document.getElementById('measureText');

        if (!textPathEl || !measureEl) return;

        const text = 'PARAH GLOBAL • MARINE SERVICES • ';
        const speed = 1;

        // Measure text length
        let spacing = 0;
        if (measureEl.getComputedTextLength) {
            spacing = measureEl.getComputedTextLength();
        } else {
            spacing = 500; // fallback
        }

        // Generate repeated text
        const repeatCount = Math.ceil(1800 / spacing) + 2;
        let totalText = '';
        for (let i = 0; i < repeatCount; i++) {
            totalText += text;
        }

        // Update textPath content
        textPathEl.textContent = totalText;

        // Set initial offset
        let offset = -spacing;
        textPathEl.setAttribute('startOffset', offset + 'px');

        // Animation loop
        function animate() {
            offset -= speed;

            const wrapPoint = spacing;
            if (offset <= -wrapPoint) {
                offset += wrapPoint;
            }
            if (offset > 0) {
                offset -= wrapPoint;
            }

            textPathEl.setAttribute('startOffset', offset + 'px');
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
})();
