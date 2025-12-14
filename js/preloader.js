//Promise.all([
//        // Wait for the HTML structure and CSS to parse
//        new Promise(resolve => {
//            if (document.readyState === 'loading') {
//                document.addEventListener('DOMContentLoaded', resolve);
//            } else {
//                resolve(); // DOM was already ready
//            }
//        }),
//        // Wait for the fonts to actually load
//        document.fonts.ready 
//    ]).then(() => {
//        // Both are done. Reveal the page.
//        document.documentElement.classList.add('wf-active');
//    });
