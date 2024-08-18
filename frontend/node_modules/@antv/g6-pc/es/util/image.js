/**
 * Clone group and clone the clip shapes of image shapes.
 * @param group group to be cloned
 * @returns cloned group with same clipped shapes of original group
 */
export var cloneGElement = function cloneGElement(element) {
  var vElement = element.clone();
  applyCloneClip(element, vElement);
  return vElement;
};
/**
 * Apply the clipShape for image shapes from original element to cloned one (clonedElement).
 * @param element original element
 * @param clonedElement cloned element of original element
 */
var applyCloneClip = function applyCloneClip(element, clonedElement) {
  var _a;
  if (element.isGroup() && clonedElement.isGroup()) {
    (_a = element.get('children')) === null || _a === void 0 ? void 0 : _a.forEach(function (child, i) {
      var clonedChild = clonedElement.get('children')[i];
      applyCloneClip(child, clonedChild);
    });
  }
  var type = element.get('type');
  var clonedType = clonedElement.get('type');
  if (type !== 'image' || clonedType !== 'image') return;
  var clipShape = element.get('clipShape');
  if (clipShape) {
    clonedElement.setClip({
      type: clipShape.get('type'),
      attrs: clipShape.attr()
    });
  }
};