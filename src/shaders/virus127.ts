// https://www.shadertoy.com/view/tlV3Dt

export default `
float n11(float p) {
	return fract(sin(p*154.101)*313.019);
} 
float n21(vec2 p) {
    float n = sin(dot(p, vec2(7, 157)));    
    return n;
}
vec3 hash33(vec3 p){ 
    float n = sin(dot(p, vec3(7, 157, 113)));    
    return fract(vec3(2097152, 262144, 32768)*n); 
}

float voronoi(vec3 p){
	vec3 b, r, g = floor(p);
	p = fract(p);
	float d = 1.; 
	for(int j = -1; j <= 1; j++) {
	    for(int i = -1; i <= 1; i++) {
		    b = vec3(i, j, -1);
		    r = b - p + hash33(g+b);
		    d = min(d, dot(r,r));
		    b.z = 0.0;
		    r = b - p + hash33(g+b);
		    d = min(d, dot(r,r));
		    b.z = 1.;
		    r = b - p + hash33(g+b);
		    d = min(d, dot(r,r));
	    }
	}
	
	return d; // Range: [0, 1]
}

float nebula(in vec3 p) {
    float amp = 1., sum=0., z= 1., m = 0.;
    for(int i=1; i<=10;i++){
    	vec3 t = vec3(0., 0., p.z+iTime*.1);
        z *= 2.;
        m += voronoi(vec3(p.xy*z, 1.)+t) *amp;
        sum += amp;
        amp *= .5;
    }
    m /= sum;
    return pow(m, 1.5);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;
    vec3 col = vec3(.0);
    
    float m = nebula(vec3(uv,1.));
    m = pow(m*1.8, 3.);
    col += vec3(m);
    
    uv *= rotate2d(m*10.);
    m = voronoi(vec3(uv*5.,1.));
    col = vec3(pow(m, 1.5));

    // Output to screen
    fragColor = vec4(col,1.0);
}
`