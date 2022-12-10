export default `
float getHillPattern(float x) {
    return -(sin(-x)+2.)*log(abs(abs(mod(x,2.)) - 1.)) / 100.;
}
 
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy-.5;

    // Time varying pixel color
    vec3 col = (
            getHillPattern((uv.x/uv.y+iTime/10.)*10.)
    )*vec3(0,2,4);

    // Output to screen
    fragColor = vec4(col,1.0);
}
`
