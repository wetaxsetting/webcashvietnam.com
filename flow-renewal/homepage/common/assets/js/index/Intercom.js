var Intercom = function () {

    return {
        drawButton : drawButton
    }

    function drawButton() {
        // ê°œë°œ ì„œë²„ì—ì„œë§Œ ë™ìž‘
        if (!Often.isGlobal()) {return}
        connectIntercom();
        /*window.Intercom('show');*/
    }


    function connectIntercom() {

        var APP_ID = "ve27vjjk";

        window.intercomSettings = {
            app_id: APP_ID,
            api_base: 'https://api-iam.intercom.io',
            alignment: 'right',
            horizontal_padding: 30,
            vertical_padding: 30,
            hide_default_launcher: false,
        };

        (function() {
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === "function") {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
            } else {
                var d = document;
                var i = function() {
                    i.c(arguments);
                };
                i.q = [];
                i.c = function(args) {
                    i.q.push(args);
                };
                w.Intercom = i;
                var l = function() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/' + APP_ID;
                    var x = d.getElementsByTagName('script')[0];
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

        window.Intercom('boot', {
            app_id: APP_ID,
        });
    }

}()