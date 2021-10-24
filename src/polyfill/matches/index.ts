if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype["matchesSelector"] ||
    Element.prototype["mozMatchesSelector"] ||
    Element.prototype["msMatchesSelector"] ||
    Element.prototype["oMatchesSelector"] ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s);
      let index = matches.length;
      while (--index >= 0 && matches.item(index) !== this) {}
      return index > -1;
    };
}
