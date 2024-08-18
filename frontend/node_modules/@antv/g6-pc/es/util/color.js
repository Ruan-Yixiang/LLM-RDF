import color from 'color';
import { generate } from '@ant-design/colors';
/**
 * get the mix color of backColor and frontColor with alpah
 * @param backColor background color
 * @param frontColor foreground color
 * @param frontAlpha the opacity of foreground color
 */
export var mixColor = function mixColor(backColor, frontColor, frontAlpha) {
  var bc = color(backColor);
  var fc = color(frontColor);
  return color([(1 - frontAlpha) * bc.red() + frontAlpha * fc.red(), (1 - frontAlpha) * bc.green() + frontAlpha * fc.green(), (1 - frontAlpha) * bc.blue() + frontAlpha * fc.blue()]).rgb();
};
var getColorsWithDefaultTheme = function getColorsWithDefaultTheme(subjectColor, backColor, disableColor) {
  if (backColor === void 0) {
    backColor = '#fff';
  }
  if (disableColor === void 0) {
    disableColor = 'rgb(150, 150, 150)';
  }
  var subjectColor005 = mixColor(backColor, subjectColor, 0.05).rgb().toString();
  var subjectColor01 = mixColor(backColor, subjectColor, 0.1).rgb().toString();
  var subjectColor02 = mixColor(backColor, subjectColor, 0.2).rgb().toString();
  var subjectColor04 = mixColor(backColor, subjectColor, 0.4).rgb().toString();
  var disableColor002 = mixColor(backColor, disableColor, 0.02).rgb().toString();
  var disableColor005 = mixColor(backColor, disableColor, 0.05).rgb().toString();
  var disableColor01 = mixColor(backColor, disableColor, 0.1).rgb().toString();
  var disableColor02 = mixColor(backColor, disableColor, 0.2).rgb().toString();
  var disableColor03 = mixColor(backColor, disableColor, 0.3).rgb().toString();
  var paletteFromSubject = generate(subjectColor, {
    theme: 'default',
    backgroundColor: backColor
  });
  var subjectHex = color(subjectColor).hex().toLowerCase();
  var subjectIdx = paletteFromSubject.indexOf(subjectHex);
  var deeperSubject = subjectColor;
  if (subjectIdx !== -1) {
    deeperSubject = paletteFromSubject[subjectIdx + 1];
  }
  return {
    // for nodes
    mainStroke: subjectColor,
    mainFill: subjectColor01,
    activeStroke: subjectColor,
    activeFill: subjectColor005,
    inactiveStroke: subjectColor04,
    inactiveFill: subjectColor005,
    selectedStroke: subjectColor,
    selectedFill: backColor,
    highlightStroke: deeperSubject,
    highlightFill: subjectColor02,
    disableStroke: disableColor03,
    disableFill: disableColor005,
    // for edges
    edgeMainStroke: disableColor03,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: disableColor02,
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: disableColor01,
    // for combos
    comboMainStroke: disableColor03,
    comboMainFill: disableColor002,
    comboActiveStroke: subjectColor,
    comboActiveFill: subjectColor005,
    comboInactiveStroke: disableColor03,
    comboInactiveFill: disableColor002,
    comboSelectedStroke: subjectColor,
    comboSelectedFill: disableColor002,
    comboHighlightStroke: deeperSubject,
    comboHighlightFill: disableColor002,
    comboDisableStroke: disableColor02,
    comboDisableFill: disableColor005
  };
};
var getColorsWithDarkTheme = function getColorsWithDarkTheme(subjectColor, backColor, disableColor) {
  if (backColor === void 0) {
    backColor = '#fff';
  }
  if (disableColor === void 0) {
    disableColor = '#777';
  }
  var subjectColor02 = mixColor(backColor, subjectColor, 0.2).rgb().toString();
  var subjectColor03 = mixColor(backColor, subjectColor, 0.3).rgb().toString();
  var subjectColor06 = mixColor(backColor, subjectColor, 0.6).rgb().toString();
  var subjectColor08 = mixColor(backColor, subjectColor, 0.8).rgb().toString();
  var disableColor02 = mixColor(backColor, disableColor, 0.2).rgb().toString();
  var disableColor025 = mixColor(backColor, disableColor, 0.25).rgb().toString();
  var disableColor03 = mixColor(backColor, disableColor, 0.3).rgb().toString();
  var disableColor04 = mixColor(backColor, disableColor, 0.4).rgb().toString();
  var disableColor05 = mixColor(backColor, disableColor, 0.5).rgb().toString();
  var paletteFromSubject = generate(subjectColor, {
    theme: 'dark',
    backgroundColor: backColor
  });
  var subjectHex = color(subjectColor).hex().toLowerCase();
  var subjectIdx = paletteFromSubject.indexOf(subjectHex);
  var deeperSubject = subjectColor;
  if (subjectIdx !== -1) {
    deeperSubject = paletteFromSubject[subjectIdx + 1];
  }
  return {
    // for nodes
    mainStroke: subjectColor08,
    mainFill: subjectColor02,
    activeStroke: subjectColor,
    activeFill: subjectColor03,
    inactiveStroke: subjectColor08,
    inactiveFill: subjectColor02,
    selectedStroke: subjectColor,
    selectedFill: subjectColor02,
    highlightStroke: subjectColor,
    highlightFill: subjectColor06,
    disableStroke: disableColor05,
    disableFill: disableColor025,
    // for edges
    edgeMainStroke: disableColor,
    edgeActiveStroke: subjectColor,
    edgeInactiveStroke: disableColor,
    edgeSelectedStroke: subjectColor,
    edgeHighlightStroke: subjectColor,
    edgeDisableStroke: disableColor03,
    // for combos
    comboMainStroke: disableColor04,
    comboMainFill: disableColor025,
    comboActiveStroke: subjectColor,
    comboActiveFill: disableColor02,
    comboInactiveStroke: disableColor04,
    comboInactiveFill: disableColor025,
    comboSelectedStroke: subjectColor,
    comboSelectedFill: disableColor02,
    comboHighlightStroke: deeperSubject,
    comboHighlightFill: disableColor025,
    comboDisableStroke: disableColor04,
    comboDisableFill: disableColor02
  };
};
/**
 * get the set of colors according to the subject color and background color
 * @param subjectColor the subject color
 * @param backColor background color
 * @param disableColor the color for disable state
 */
export var getColorsWithSubjectColor = function getColorsWithSubjectColor(subjectColor, backColor, theme, disableColor) {
  if (backColor === void 0) {
    backColor = '#fff';
  }
  if (theme === void 0) {
    theme = 'default';
  }
  if (disableColor === void 0) {
    disableColor = 'rgb(150, 150, 150)';
  }
  if (theme === 'default') return getColorsWithDefaultTheme(subjectColor, backColor, 'rgb(150, 150, 150)');
  return getColorsWithDarkTheme(subjectColor, backColor, '#777');
};
export var getColorSetsBySubjectColors = function getColorSetsBySubjectColors(subjectColors, backColor, theme, disableColor) {
  if (backColor === void 0) {
    backColor = '#fff';
  }
  if (theme === void 0) {
    theme = 'default';
  }
  if (disableColor === void 0) {
    disableColor = 'rgb(150, 150, 150)';
  }
  var sets = [];
  subjectColors.forEach(function (sColor) {
    sets.push(getColorsWithSubjectColor(sColor, backColor, theme, disableColor));
  });
  return sets;
};