    Promise.all([
        new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        }),
        document.fonts.ready
    ]).then(() => {
        // Change this line to target the BODY
        document.body.classList.add('wf-active');
    });
