class statue{
	constructor(){
		this.state=[];
		this.stateIndex=0;
	}
	back(){
		if(this.stateIndex>0){
			this.stateIndex--;
		}
		return this.state[this.stateIndex];
	}
	setstate(data){
		this.state.push(data);
		this.stateIndex=this.state.length;
	}
}
