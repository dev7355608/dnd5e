/**
 * The detection mode for Blindsight.
 */
export class DetectionModeBlindsight extends DetectionMode {
  constructor() {
    super({
      id: "blindsight",
      label: "DND5E.SenseBlindsight",
      type: DetectionMode.DETECTION_TYPES.OTHER,
      walls: true,
      angle: false
    });
  }

  /** @override */
  static getDetectionFilter() {
    return this._detectionFilter ??= OutlineOverlayFilter.create({
      outlineColor: [1, 1, 1, 1],
      knockout: true,
      wave: true
    });
  }

  /** @override */
  _canDetect(visionSource, target) {
    if ( visionSource.object.document.hasStatusEffect(CONFIG.specialStatusEffects.BURROW) ) return false;
    if ( target instanceof Token ) {
      if ( target.document.hasStatusEffect(CONFIG.specialStatusEffects.BURROW) ) return false;
    }
    return true;
  }

  /** @override */
  _testLOS(visionSource, mode, target, test) {
    return !CONFIG.Canvas.polygonBackends.sight.testCollision(
      { x: visionSource.x, y: visionSource.y },
      test.point,
      {
        type: "sight",
        mode: "any",
        source: visionSource,
        useThreshold: true
      }
    );
  }
}

CONFIG.Canvas.detectionModes.blindsight = new DetectionModeBlindsight();
