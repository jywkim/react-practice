export default class Rover {
    constructor (direction, position) {
        this.direction = direction;
        this.position = position;
        this.log = [];
        let startPos = 'Starting Position: ' + this.position.join();
        let startDir = 'Starting Direction: '  + this.direction;
        this.log.push(startDir, startPos);
    }

    turnLeft() {
        switch (this.direction) {
            case 'N':
                this.direction = 'W';
                break;
            case 'W':
                this.direction = 'S';
                break;
            case 'S':
                this.direction = 'E';
                break;
            case 'E':
                this.direction = 'N';
                break;
            default:
        }
        this.logTurn('L');
    }
    
    turnRight() {
        switch (this.direction) {
            case 'N':
                this.direction = 'E';
                break;
            case 'E':
                this.direction = 'S';
                break;
            case 'S':
                this.direction = 'W';
                break;
            case 'W':
                this.direction = 'N';
                break;
            default:
        }
        this.logTurn('R');
    }
    
    moveForward() {
        switch (this.direction) {
            case 'N':
                this.position[0] -= 1;
                break;
            case 'E':
                this.position[1] += 1;
                break;
            case 'S':
                this.position[0] += 1;
                break;
            case 'W':
                this.position[1] -= 1;
                break;
            default:
        }
        this.checkObstacle('forward');
    }
    
    moveBackwards() {
        switch (this.direction) {
            case 'N':
                this.position[0] += 1;
                break;
            case 'E':
                this.position[1] -= 1;
                break;
            case 'S':
                this.position[0] -= 1;
                break;
            case 'W':
                this.position[1] += 1;
                break;
            default:
        }
        this.checkObstacle('backwards');
    }

    checkObstacle(movement) {
        var obstacleCheck = 'Rover moved ' + movement + ', Rovers position is: ' + this.position;
        if (this.position[0] < 0 || this.position[0] >= 10) {
            this.position[0] = 0;
            obstacleCheck = 'Obstacle detected (Top/Bottom), you cannot move ' + movement + '. Rovers position set to: ' + this.position;
        } else if (this.position[1] < 0 || this.position[1] >= 10) {
            this.position[1] = 0;
            obstacleCheck = 'Obstacle detected (Left/Right), you cannot move ' + movement + '. Rovers position set to: ' + this.position;
        }
        this.logMovement(obstacleCheck);
    }

    logMovement(obstacleCheck) {
        this.log.push(obstacleCheck);
    }
    
    logTurn(turn) {
        this.log.push('Rover turned ' + turn + ', now Rovers direction is: ' + this.direction);
    }

    commands(command) {
        for (var i = 0; i < command.length; i++) {
            switch (command[i]) {
                case 'b':
                    this.moveBackwards();
                    break;
                case 'f':
                    this.moveForward();
                    break;
                case 'r':
                    this.turnRight();
                    break;
                case 'l':
                    this.turnLeft();
                    break;
                default:
            }
        }
    }
}