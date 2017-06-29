!function() {
    function e(t) {
        for (var o = [], n = t.firstChild; n; n = n.nextSibling) if (n.nodeType === Node.ELEMENT_NODE) if (n.localName === d || n.childNodes.length) {
            var r = N.exec(n.cloneNode(!1).outerHTML) || [ "", "", "" ];
            o.push(r[1], e(n.localName === d ? n.content : n), r[2]);
        } else o.push(n.outerHTML); else h.appendChild(n.cloneNode(!1)), o.push(h.innerHTML), 
        h.textContent = "";
        return o.join("");
    }
    function t(t) {
        Object.defineProperty(t, "innerHTML", {
            get: function() {
                return e(this.content);
            },
            set: function(e) {
                var t = o(e), n = u.body;
                for (n.innerHTML = [ t[1], e, t[2] ].join(""), p.bootstrap(u); this.content.firstChild; ) this.content.removeChild(this.content.firstChild);
                for (var r = t[0]; r--; ) n = n.lastChild;
                for (;n.firstChild; ) this.content.appendChild(n.firstChild);
            },
            configurable: !0
        });
    }
    function o(e) {
        var t = (v.exec(e) || [ "", "" ])[1].toLowerCase();
        return y[t] || y._default;
    }
    var n = "undefined" == typeof HTMLTemplateElement;
    /Trident/.test(navigator.userAgent) && function() {
        var e = Document.prototype.importNode;
        Document.prototype.importNode = function() {
            var t = e.apply(this, arguments);
            if (t.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                var o = this.createDocumentFragment();
                return o.appendChild(t), o;
            }
            return t;
        };
    }();
    var r = Node.prototype.cloneNode, c = Document.prototype.createElement, i = Document.prototype.importNode, l = function() {
        if (!n) {
            var e = document.createElement("template"), t = document.createElement("template");
            t.content.appendChild(document.createElement("div")), e.content.appendChild(t);
            var o = e.cloneNode(!0);
            return 0 === o.content.childNodes.length || 0 === o.content.firstChild.content.childNodes.length || !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
        }
    }(), a = function() {
        if (!n) {
            var e = document.createElement("template");
            return e.content.appendChild(document.createElement("div")), 0 === document.importNode(e, !0).content.childNodes.length;
        }
    }(), d = "template", p = function() {};
    if (n) {
        var u = document.implementation.createHTMLDocument("template"), m = document.createElement("style");
        m.textContent = d + "{display:none;}";
        var f = document.head;
        f.insertBefore(m, f.firstElementChild), p.prototype = Object.create(HTMLElement.prototype);
        var s = {
            __proto__: []
        } instanceof Array && !document.createElement("div").hasOwnProperty("innerHTML");
        p.decorate = function(e) {
            if (!e.content) {
                e.content = u.createDocumentFragment();
                for (var o; o = e.firstChild; ) e.content.appendChild(o);
                s ? e.__proto__ = p.prototype : (e.cloneNode = function(e) {
                    return p._cloneNode(this, e);
                }, t(e)), p.bootstrap(e.content);
            }
        };
        var h = u.createElement("div"), N = /^(.*)(<\/[a-z][^\/]*>)$/i;
        p.getInnerHTML = e;
        var y = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            thead: [ 1, "<table>", "</table>" ],
            col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            _default: [ 0, "", "" ]
        };
        y.optgroup = y.option, y.tbody = y.tfoot = y.colgroup = y.caption = y.thead, y.th = y.td;
        var v = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
        t(p.prototype), p.bootstrap = function(e) {
            for (var t, o = e.querySelectorAll(d), n = 0, r = o.length; n < r && (t = o[n]); n++) p.decorate(t);
        }, document.addEventListener("DOMContentLoaded", function() {
            p.bootstrap(document);
        }), Document.prototype.createElement = function() {
            "use strict";
            var e = c.apply(this, arguments);
            return "template" === e.localName && p.decorate(e), e;
        };
    }
    (n || l || a) && (p._cloneNode = function(e, t) {
        var o = r.call(e, !1);
        return this.decorate && this.decorate(o), t && (o.content.appendChild(r.call(e.content, !0)), 
        this.fixClonedDom(o.content, e.content)), o;
    }, p.prototype.cloneNode = function(e) {
        return p._cloneNode(this, e);
    }, p.fixClonedDom = function(e, t) {
        if (t.querySelectorAll) for (var o, n, r = t.querySelectorAll(d), c = e.querySelectorAll(d), i = 0, l = c.length; i < l; i++) n = r[i], 
        o = c[i], this.decorate && this.decorate(n), o.parentNode.replaceChild(n.cloneNode(!0), o);
    }, (n || l) && (Node.prototype.cloneNode = function(e) {
        var t;
        if (this instanceof DocumentFragment) {
            if (!e) return this.ownerDocument.createDocumentFragment();
            t = this.ownerDocument.importNode(this, !0);
        } else t = r.call(this, e);
        return e && p.fixClonedDom(t, this), t;
    }), (n || a) && (Document.prototype.importNode = function(e, t) {
        if (e.localName === d) return p._cloneNode(e, t);
        var o = i.call(this, e, t);
        return t && p.fixClonedDom(o, e), o;
    }), l && (window.HTMLTemplateElement.prototype.cloneNode = function(e) {
        return p._cloneNode(this, e);
    })), n && (window.HTMLTemplateElement = p);
}();