 // 2 second delay to let Google Analytics cookies load
    setTimeout(function () {

        // Split the GA cookie
        var GATrafficSource = (function () {
            var pairs = (/(?:^|; )__utmz=([^;]*)/.exec(document.cookie) || []).slice(1).pop().split('.').slice(4).join('.').split('|');
            var vals = {};
            for (var i = 0; i < pairs.length; i++) {
                var temp = pairs[i].split('=');
                vals[temp[0]] = temp[1];
            }
            return {
                'utm_source': (vals.utmgclid) ? "google" : vals.utmcsr,
                'utm_medium': (vals.utmgclid) ? "cpc" : vals.utmcmd,
                'utm_campaign': vals.utmccn,
                'utm_content': vals.utmcct,
                'utm_term': vals.utmctr
            };
        }());

        // Find and split campaign name cookie
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        var campaignName = /[^(=)]*(?=\|utmcmd)/.exec(readCookie('__utmz'))
        var conversion_page = window.location.pathname;
        var landing_page = window.location.pathname;

        // Create cookie function
        function setCookie(cname, cvalue, exdays, path) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.YOURDOMAIN.COM;" + "path=" + path;
        }
        
        // If cookie is empty, create cookie. This should be one loop.

        if (readCookie("source") === null) {
            setCookie("source", GATrafficSource.utm_source, 1, '/');
        }
        if (readCookie("medium") === null) {
            setCookie("medium", GATrafficSource.utm_medium, 1, '/');
        }
        if (readCookie("content") === null) {
            setCookie("content", GATrafficSource.utm_content, 1, '/');
        }
        if (readCookie("keyword") === null) {
            setCookie("keyword", GATrafficSource.utm_term, 1, '/');
        }
        if (readCookie("campaign") === null) {
            setCookie("campaign", campaignName, 1, '/');
        }
        if (readCookie("landing_page") === null) {
            setCookie("landing_page", landing_page, 1, '/');
        }

        // Conversion page cookie is rewritten every page load
        setCookie("conversion_page", conversion_page, 1, '/');

	// Add cookie info to hidden fields for web to lead fields
        jQuery('input:hidden[name=web_source]').val(readCookie('source'));
        jQuery('input:hidden[name=web_medium]').val(readCookie('medium'));
        jQuery('input:hidden[name=web_content]').val(readCookie('content'));
        jQuery('input:hidden[name=web_keyword]').val(readCookie('keyword'));
        jQuery('input:hidden[name=web_campaign]').val(readCookie('campaign'));
        jQuery('input:hidden[name=landing_page]').val(readCookie('landing_page'));
        jQuery('input:hidden[name=conversion_page]').val(readCookie('conversion_page'));
      }, 2000); // The 2 second delay from the beginning
