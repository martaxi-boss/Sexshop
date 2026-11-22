import UIKit
import WebKit
import Foundation

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    func application(_ application: UIApplication, didFinishLaunchingWithOptions options: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let win = UIWindow(frame: UIScreen.main.bounds)
        win.rootViewController = BrowserProbe()
        win.makeKeyAndVisible()
        window = win
        return true
    }
}

final class BrowserProbe: UIViewController, WKNavigationDelegate, WKUIDelegate {
    var browser: WKWebView!
    var clicked = false
    var awin = false
    var merchant = false
    var popup = false
    var merchantHTTP = 0
    var notes = [String]()
    var errors = [String]()

    func report(_ status: String) {
        let result: [String: Any] = [
            "status": status,
            "clicked": clicked,
            "awin": awin,
            "merchant": merchant,
            "merchantHTTP": merchantHTTP,
            "popup": popup,
            "lastHost": browser?.url?.host ?? "",
            "notes": notes,
            "errors": errors
        ]
        if let bytes = try? JSONSerialization.data(withJSONObject: result, options: [.prettyPrinted,.sortedKeys]) {
            let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("result.json")
            try? bytes.write(to: path, options: [.atomic])
        }
    }

    func mark(_ note: String) {
        notes.append(note)
        report("running")
    }

    func failure(_ note: String) {
        errors.append(note)
        report("failed")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        browser = WKWebView(frame: view.bounds, configuration: config)
        browser.autoresizingMask = [.flexibleWidth,.flexibleHeight]
        browser.navigationDelegate = self
        browser.uiDelegate = self
        view.addSubview(browser)
        report("starting")
        browser.load(URLRequest(url: URL(string: "https://sevelora.eu/produto/43428124436")!))
    }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else { decisionHandler(.allow); return }
        let host = url.host ?? ""
        if host.contains("awin1.com") {
            awin = true
            mark("AWIN_REQUEST")
            if action.targetFrame == nil {
                popup = true
                failure("AWIN_REQUESTED_NEW_WINDOW")
                decisionHandler(.cancel)
                return
            }
        }
        if host.contains("diversual.com") { mark("DIVERT_TO_DIVERSUAL") }
        decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        if let http = navigationResponse.response as? HTTPURLResponse, (http.url?.host ?? "").contains("diversual.com") {
            merchantHTTP = http.statusCode
            mark("MERCHANT_HTTP_" + String(merchantHTTP))
        }
        decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let host = webView.url?.host ?? ""
        mark("LOADED_" + host)
        if host == "sevelora.eu" && !clicked {
            let check = """
            (function(){
              var a = document.querySelector('a[href*="awin1.com/pclick.php"]');
              if (!a) return "NOT_FOUND";
              var u = new URL(a.href);
              if (u.searchParams.get("a") !== "3157353" || u.searchParams.get("m") !== "37722" || u.searchParams.get("p") !== "43428124436") return "INVALID";
              if (a.target === "_blank") return "POPUP_LINK";
              return "VALID";
            })()
            """
            webView.evaluateJavaScript(check) { [weak self] value, error in
                guard let self = self else { return }
                if let error = error { self.failure("CHECK_JS_" + error.localizedDescription); return }
                guard value as? String == "VALID" else { self.failure("LINK_" + String(describing: value)); return }
                self.clicked = true
                self.mark("AFFILIATE_CLICK_ISSUED")
                webView.evaluateJavaScript("document.querySelector('a[href*=\"awin1.com/pclick.php\"]').click()") { _,_ in }
            }
        } else if host.contains("diversual.com") {
            merchant = true
            if clicked && awin && !popup && merchantHTTP == 200 {
                notes.append("NATIVE_IOS_WEBVIEW_REACHED_MERCHANT")
                report("pass")
            } else {
                failure("MERCHANT_LOADED_WITH_MISSING_TRACKING_OR_STATUS")
            }
        }
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        if (error as NSError).code == NSURLErrorCancelled { mark("PROVISIONAL_CANCELLED_DURING_REDIRECT"); return }
        failure("PROVISIONAL_" + error.localizedDescription)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        if (error as NSError).code == NSURLErrorCancelled { return }
        failure("NAVIGATION_" + error.localizedDescription)
    }

    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        popup = true
        failure("NEW_BROWSER_WINDOW_REQUESTED")
        return nil
    }
}
