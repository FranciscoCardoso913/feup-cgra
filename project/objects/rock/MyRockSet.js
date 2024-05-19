import {CGFobject} from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
	constructor(scene,texture,  bl, tr, nrocks= 1, rocks_size = 1 ) {
		super(scene);
		this.bl = bl ;
        this.tr = tr ;
		this.nrocks = nrocks;
		this.texture =  texture;
		this.rocks_size = rocks_size;
		this.rocks = []
		this.positions = [];
		this.initBuffers();
	}
	initBuffers() {
		let bl_x,bl_y, tr_x, tr_y,height, width, vw, vh, max_number;
		bl_x = this.bl[0];
		bl_y = this.bl[1];
		tr_x = this.tr[0];
		tr_y = this.tr[1];
		height = Math.abs(tr_y - bl_y);
		width = Math.abs(tr_x -bl_x);
		vw = (width/ (this.rocks_size)) /2;
		console.log(vw)
		vh = (height / (this.rocks_size))/2;
		max_number = (Math.floor(vw*vh));
		this.nrocks = max_number< this.nrocks? max_number: this.nrocks;
		let ocupied_spaces = [];
		while (this.nrocks>0){
			let pos = Math.floor( Math.random() * max_number);
			if(!ocupied_spaces.includes(pos)){
				let pos_y = Math.floor( pos / vw);
				let pos_x = pos % vw;
				ocupied_spaces.push(pos);
				this.positions.push([pos_x*2, 0, pos_y*2]);
				this.rocks.push(new MyRock(this.scene, this.texture))
				this.nrocks-= 1;
			}
		}

	};

	display(){
		let idx = 0;
		let min_x = Math.min(this.bl[0],this.tr[0])
		let min_y = Math.min(this.bl[1],this.tr[1])
		this.scene.pushMatrix()
		this.scene.translate(min_x, 0, min_y);
		this.scene.scale(this.rocks_size, this.rocks_size, this.rocks_size);
		this.positions.forEach((value)=> {
			this.scene.pushMatrix();
			this.scene.translate(...value);
			this.rocks[idx].display();
			
			this.scene.popMatrix();
			idx+=1;
		}
		
		
	)
	
	this.scene.popMatrix()
	}
}


