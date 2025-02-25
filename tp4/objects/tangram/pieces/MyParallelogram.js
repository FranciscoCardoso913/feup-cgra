import {CGFobject, CGFappearance} from '../../../../lib/CGF.js';
/**
 * MyParallelogram 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, texCoords ) {
		super(scene);
		this.texCoords = texCoords
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
			3, 1, 0,	//3
			0, 0, 0,	//0
			1, 1, 0,	//1
			2, 0, 0,	//2
			3, 1, 0,	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 2, 0,
			3, 2, 1,

            6, 5, 4,
            6, 7, 5,

		];

        this.normals = [
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	
}

