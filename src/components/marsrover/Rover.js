export default class Rover {
    constructor (matrix, direction, position) {
        this.direction = direction;
        this.position = position;
        this.boundaryLeft = matrix.boundaryLeft;
        this.boundaryRight = matrix.boundaryRight;
        this.boundaryTop = matrix.boundaryTop;
        this.boundaryBottom = matrix.boundaryBottom;
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
        this.logMove('L', false);
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
        this.logMove('R', false);
    }
    
    moveForward() {
        switch (this.direction) {
            case 'N':
                this.position[1] += 1;
                break;
            case 'E':
                this.position[0] += 1;
                break;
            case 'S':
                this.position[1] -= 1;
                break;
            case 'W':
                this.position[0] -= 1;
                break;
            default:
        }
        this.checkObstacle('F');
    }
    
    moveBackwards() {
        switch (this.direction) {
            case 'N':
                this.position[1] -= 1;
                break;
            case 'E':
                this.position[0] -= 1;
                break;
            case 'S':
                this.position[1] += 1;
                break;
            case 'W':
                this.position[0] += 1;
                break;
            default:
        }
        this.checkObstacle('B');
    }

    checkObstacle(command) {
        var obstacle = true;
        if (this.position[0] < this.boundaryLeft) {
            this.position[0] = this.boundaryLeft;
        } else if (this.position[0] > this.boundaryRight) {
            this.position[0] = this.boundaryRight;
        } else if (this.position[1] < this.boundaryBottom) {
            this.position[1] = this.boundaryBottom;
        } else if (this.position[1] > this.boundaryTop) {
            this.position[1] = this.boundaryTop;
        } else {
            obstacle = false;
        }
        this.logMove(command, obstacle);
    }

    logMove(command, obstacle) {
        var obstacleMsg = obstacle ? 'Obstacle! ' : '';
        var output = 'Input: ' + command + ' | ' + obstacleMsg + '\
        Rover is at ' + this.position + ' \
        and it is facing ' + this.direction;
        this.log.push(output);   
    }

    commands(command) {
        for (var i = 0; i < command.length; i++) {
            switch (command[i]) {
                case 'B':
                    this.moveBackwards();
                    break;
                case 'F':
                    this.moveForward();
                    break;
                case 'R':
                    this.turnRight();
                    break;
                case 'L':
                    this.turnLeft();
                    break;
                default:
            }
        }
    }
}