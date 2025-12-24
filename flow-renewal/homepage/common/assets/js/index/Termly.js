var Termly = function () {

    return {
        drawBanner : drawBanner,
        drawButton: drawButton
    }
    function drawButton() {
        `<a href="#" onClick="window.displayPreferenceModal();return false;" id="termly-consent-preferences">Consent Preferences</a>`
    }

    function drawBanner() {
        connectTermly();
    }

    function getUUID() {
        const PROD_UUID = "4794cf81-9058-4003-8c5a-176121e510e7";
        const DEV_UUID = "66503314-652e-40b7-928a-ea452d375b92";
        if (Often.isGlobal()) { //í•´ì™¸ë²„ì „ì—ë§Œ SHOW
            return PROD_UUID;
        } else {
            return DEV_UUID;
        }
    }

    function connectTermly() {
        window.termplySetting = {
            app_id: getUUID(),
            api_base: 'https://app.termly.io'
        };

        (function() {
            var w = window;
            var ic = w.Termly;
            if (typeof ic === "function") {
                ic('startProcess');
                ic('update', w.termplySetting);
            } else {
                var d = document;
                var i = function() {
                    i.c(arguments);
                };
                i.q = [];
                i.c = function(args) {
                    i.q.push(args);
                };
                w.Termly = i;
                const l = function() {
                    const s = d.createElement('script');
                    s.type = "text/javascript";
                    s.src = "https://app.termly.io/embed.min.js";
                    s.id = getUUID();
                    s.setAttribute("data-name", "termly-embed-banner");
                    const x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                    l();
                } else if (w.attachEvent) {
                    w.attachEvent('onload', l);
                } else {
                    w.addEventListener('load', l, false);
                }
            }
        })();
        window.Termly('boot', {
            app_id: getUUID(),
        });
    }

}()