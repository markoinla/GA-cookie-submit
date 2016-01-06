# GA-cookie-submit

This is a short script that helps get Google Analytics cookie information into third-party software using an HTML form.

It finds and parses the following GA cookie information:
* Source
  * The reffering website / (direct) if none
* Medium
  * The reffering channel, "organic" for search, "cpc" for paid traffic, etc.
* Keyword
  * The keyword a visitor searched to find your website. Mostly depricated due to SSL default on Google.
* Content
  * Custom set variable for tracking call to action buttons or different ads
* Landing Page
  * The page a visitor first saw
* Conversion Page
  * The page that a visitor ultimately converted on

**Requirements**
* Google Analytics
* jQuery (any version will do)

**Installation**

1. Download and link to GA-cookie-submit.js right above the bottom </body> tag.

2. Change '.YOURDOMAIN.COM' in the setCookie function to your domain.

```javascript
// Create cookie function
        function setCookie(cname, cvalue, exdays, path) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.YOURDOMAIN.COM;" + "path=" + path;
        }
```

3. Add the following hidden fields in the form you're submitting:
```html
<input name="web_source" type="hidden">
<input name="web_medium" type="hidden">
<input name="web_content" type="hidden">
<input name="web_keyword" type="hidden">
<input name="web_campaign" type="hidden">
<input name="landing_page" type="hidden">
<input name="conversion_page" type="hidden">
```
Depending on the third-party you're using, i.e. Hubspot, these fields might be generated automatically. Just make sure that the `name="web_source"` matches `jQuery('input:hidden[name=web_source]').val(readCookie('source'));`
