class Player{
    topPos = 0;
    leftPos = 0;
    step = 3;

    constructor(username){
        this.username = username;
    }

    setPosition(topPos, leftPos){
        this.topPos = topPos;
        this.leftPos = leftPos;
    }
    getPosition(){
        return (this.topPos, this.leftPos);
    }

    setStep(step){
        this.step = step;
    }

    getStep(){
        return this.step;
    }

}