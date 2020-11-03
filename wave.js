'use strict';

import { Point } from './point.js';

export class Wave {
    constructor(index, totalPoints ,color){
        this.index= index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth,stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints -1);

        this.init();
    }
    
    init(){
        this.points = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point (
                this.index + i,
                this.pointGap * i,
                this.centerY,

            );
            this.points[i] = point;
            
        }
    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        //포인트 고정
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX,prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints -1) {
                this.points[i].update();
                //그 외 인덱스만 실행시킨다..?
            }//totalPoints -1과 같거나 0이면 업데이트 함수 움직이지 않을거
            
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX,prevY,cx,cy);
            //lineTo === 선 quadraticCurveTo === 곡선
            prevX = this.points[i].x;
            prevY = this.points[i].y;

        }
        ctx.lineTo(prevX,prevY);
        ctx.lineTo(this.stageWidth,this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}