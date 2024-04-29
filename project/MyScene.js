import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MySphere } from "./objects/MySphere.js";
import { MyFlower } from "./objects/flower/MyFlower.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.panorameTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.groundTexture = new CGFtexture(this, "images/terrain.jpg");
    this.rockTexture =  new CGFtexture(this, "images/rock-texture.png");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.flower = new MyFlower(this);
    this.rock = new MyRock(this, this.rockTexture);
    this.sphere = new MySphere(this, 10, 10);
    this.panorama = new MyPanorama(this, this.panorameTexture);
    this.rockSet = new MyRockSet(this,this.rockTexture,[0,0],[20,20],2);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);


    
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.groundTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.fov=1.8;

  }
  initLights() {
    this.lights[0].setPosition(15, 5, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.8,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  updateFov(){
    this.camera.fov = this.fov;
  }
  setDefaultAppearance() {
    this.appearance.setTexture(this.groundTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    
    // ---- BEGIN Primitive drawing section
    this.setDefaultAppearance();

    this.pushMatrix();
    this.appearance.apply();
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.panorama.display();

    this.rockSet.display()
    //this.flower.display();
    
    //this.sphere.enableNormalViz()
    // ---- END Primitive drawing section
  }
}
