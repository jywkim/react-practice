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

    turn(isLeft) {
        switch (this.direction) {
            case 'N':
                this.direction = isLeft ? 'W' : 'E';
                break;
            case 'W':
                this.direction = isLeft ? 'S' : 'N';
                break;
            case 'S':
                this.direction = isLeft ? 'E' : 'W';
                break;
            case 'E':
                this.direction = isLeft ? 'N' : 'S';
                break;
            default:
        }
        this.logMove(isLeft ? 'L' : 'R', false);
    }
    
    move(isForward) {
        switch (this.direction) {
            case 'N':
                isForward ? this.position[1] += 1 : this.position[1] -= 1;
                break;
            case 'E':
                isForward ? this.position[0] += 1 : this.position[0] -= 1;
                break;
            case 'S':
                isForward ? this.position[1] -= 1 : this.position[1] += 1;
                break;
            case 'W':
                isForward ? this.position[0] -= 1 : this.position[0] += 1;
                break;
            default:
        }
        this.checkObstacle(isForward ? 'F' : 'B');
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
        var invalidCommandMsg = 'Invalid command! Please enter F, B, L, or R.';
        var validCommandMsg = 'Rover is at ' + this.position + ' and it is facing ' + this.direction;
        var logMsg = ['F', 'B', 'L', 'R'].includes(command) ? validCommandMsg : invalidCommandMsg;
        var output = 'Input: ' + command + ' | ' + obstacleMsg + logMsg;
        this.log.push(output);
    }

    commands(command) {
        for (var i = 0; i < command.length; i++) {
            switch (command[i]) {
                case 'F':
                    this.move(true);
                    break;
                case 'B':
                    this.move(false);
                    break;
                case 'L':
                    this.turn(true);
                    break;
                case 'R':
                    this.turn(false);
                    break;
                default:
                    this.logMove(command[i], false);
            }
        }
    }
}