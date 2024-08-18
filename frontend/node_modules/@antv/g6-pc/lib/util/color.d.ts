/**
 * get the mix color of backColor and frontColor with alpah
 * @param backColor background color
 * @param frontColor foreground color
 * @param frontAlpha the opacity of foreground color
 */
export declare const mixColor: (backColor: any, frontColor: any, frontAlpha: any) => any;
/**
 * get the set of colors according to the subject color and background color
 * @param subjectColor the subject color
 * @param backColor background color
 * @param disableColor the color for disable state
 */
export declare const getColorsWithSubjectColor: (subjectColor: any, backColor?: string, theme?: 'default' | 'dark', disableColor?: string) => {
    mainStroke: any;
    mainFill: any;
    activeStroke: any;
    activeFill: any;
    inactiveStroke: any;
    inactiveFill: any;
    selectedStroke: any;
    selectedFill: string;
    highlightStroke: any;
    highlightFill: any;
    disableStroke: any;
    disableFill: any;
    edgeMainStroke: any;
    edgeActiveStroke: any;
    edgeInactiveStroke: any;
    edgeSelectedStroke: any;
    edgeHighlightStroke: any;
    edgeDisableStroke: any;
    comboMainStroke: any;
    comboMainFill: any;
    comboActiveStroke: any;
    comboActiveFill: any;
    comboInactiveStroke: any;
    comboInactiveFill: any;
    comboSelectedStroke: any;
    comboSelectedFill: any;
    comboHighlightStroke: any;
    comboHighlightFill: any;
    comboDisableStroke: any;
    comboDisableFill: any;
} | {
    mainStroke: any;
    mainFill: any;
    activeStroke: any;
    activeFill: any;
    inactiveStroke: any;
    inactiveFill: any;
    selectedStroke: any;
    selectedFill: any;
    highlightStroke: any;
    highlightFill: any;
    disableStroke: any;
    disableFill: any;
    edgeMainStroke: string;
    edgeActiveStroke: any;
    edgeInactiveStroke: string;
    edgeSelectedStroke: any;
    edgeHighlightStroke: any;
    edgeDisableStroke: any;
    comboMainStroke: any;
    comboMainFill: any;
    comboActiveStroke: any;
    comboActiveFill: any;
    comboInactiveStroke: any;
    comboInactiveFill: any;
    comboSelectedStroke: any;
    comboSelectedFill: any;
    comboHighlightStroke: any;
    comboHighlightFill: any;
    comboDisableStroke: any;
    comboDisableFill: any;
};
export declare const getColorSetsBySubjectColors: (subjectColors: any, backColor?: string, theme?: 'default' | 'dark', disableColor?: string) => any[];
