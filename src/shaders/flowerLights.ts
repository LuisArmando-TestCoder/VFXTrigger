export default `
float lightCircle(vec2 uv, float radius, vec2 position, float radiusReduction) {
    float d = length(uv-position)*radiusReduction;

    d = smoothstep(d,0.,radius);
    
    return 1.-d;
}

vec2 getRotation(float spin, float itemsAmount, float d) {
    float cosineTime = cos(iTime + spin / itemsAmount * 3.14 * 2.) * d;
    float sineTime = sin(iTime + spin / itemsAmount * 3.14 * 2.) * d;
    
    return vec2(cosineTime, sineTime);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy-.5;
    uv.x *= iResolution.x / iResolution.y;

    // Time varying pixel color
    vec3 color = vec3(0.);
    float timeSpeed = .5;
    vec3 rotatingColor = cos(iTime*timeSpeed+uv.xyx+vec3(0,2,4));
    const float itemsAmount = 20.;
    float zoom = .25;
    const float amount = 25.;
    float stretch = 4.;
    float shineReduction = 7.;
    float rotationDisplacement = 2. + sin(iTime * timeSpeed) * cos(iTime * timeSpeed);

    for (float d = 0.; d < amount; d++) {
        for (float index = 0.; index < itemsAmount; index++) {
            float itemsDistance = d / amount * stretch * zoom;
            color += rotatingColor*lightCircle(uv, .1, getRotation(index + d / rotationDisplacement, itemsAmount, itemsDistance), shineReduction / zoom);
        }
    }

    // Output to screen
    fragColor = vec4(color,1.0);
}
`
