export function matchMediaPolyfill() {
    /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
    // Adapted to not include <= IE8 polyfill.
    window.matchMedia = window.matchMedia || (() => {
        // For browsers that support matchMedium api such as IE 9 and webkit
        let styleMedia = window.styleMedia;

        // For those that don't support matchMedium
        if (!styleMedia) {
        const style = document.createElement('style');
        const script = document.getElementsByTagName('script')[0];

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        if (!script) {
            document.head.appendChild(style);
        }
        else {
            (<Node>script.parentNode).insertBefore(style, script);
        }

        const info = window.getComputedStyle(style);

        styleMedia = {
            matchMedium: (mediaQuery) => {
            let text = '@media ' + mediaQuery + '{ #matchmediajs-test { width: 1px; } }';
            style.textContent = text;

            // Test if media query is true or false
            return info.width === '1px';
            },
            type: 'all'
        };
        }

        return (mediaQuery) => {
        return <any>{
            matches: styleMedia.matchMedium(mediaQuery || 'all'),
            media: mediaQuery || 'all'
        };
        };
    })();
}
