export default `
float cbrt(float number) {
    return pow(abs(number), 1. / 3.);
}

float getErraticWave(float number) {
    float scale = 1.;

    return (
        cbrt(sin(number))
      + pow(
          sin(
              number + iTime * 2.
          ),
          3.
        )
    ) / scale;
}

vec3 getErraticPattern(float x, float y, vec2 uv) {
    float stretch = 2.;
    float mainDance = getErraticWave(
        getErraticWave(uv.y + uv.x)
      + getErraticWave(uv.y + -uv.x)
      + getErraticWave(-uv.y + uv.x)
      + getErraticWave(-uv.y + -uv.x)
    );

    return (
        getErraticWave(
            x
        ) + getErraticWave(
            y
        )
    ) * stretch * (1. - vec3(
        mainDance * (
            sin(
                iTime / 20. + .5
            ) + 1.
        )
    ,
        mainDance * (
            sin(
                iTime / 4. + .25
            ) + .5
        )
    ,
        mainDance * (
            sin(
                iTime / 4. + 1.
            ) + .25
        ) + mainDance
    ));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // Normalized pixel coordinates (from -.5 to .5)
    vec2 uv = fragCoord/iResolution.xy-.5;

    uv.x *= iResolution.x/iResolution.y;

    float zoomOut = 10.;

    vec3 rgb = getErraticPattern(
                uv.x, uv.y, uv * zoomOut
            ) + getErraticPattern(
                -uv.x, uv.y, uv * zoomOut
            ) + getErraticPattern(
                uv.x, -uv.y, uv * zoomOut
            ) + getErraticPattern(
                -uv.x, -uv.y, uv * zoomOut
            );

    // Output to screen
    fragColor = vec4(1. - rgb, 1.);
}
`
