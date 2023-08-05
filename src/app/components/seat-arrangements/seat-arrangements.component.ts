import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-arrangements',
  templateUrl: './seat-arrangements.component.html',
  styleUrls: ['./seat-arrangements.component.css']
})
export class SeatArrangementsComponent implements OnInit {
  
  //Initialize the allocated seats array
  private rows : number = 3;
  private seatsPerRow : number = 8;
  public allocatedSeats: boolean[][] = [];
  public allocatedSeatLabels : string[]=[];
  public stringRef = String;

  constructor() {
  }

  ngOnInit(): void {
    this.initializeSeating();
  }

  initializeSeating(): void {
    for (let i = 0; i < this.rows; i++) {
      this.allocatedSeats[i] = Array(this.seatsPerRow).fill(false);
    }
  }

  allocateSeats(numSeats: number): string[] {

    const middleStart = Math.floor(this.seatsPerRow / 2) - 2;
    const middleEnd = middleStart + numSeats - 1;

    for (let i = 0; i < this.rows; i++) {
      if (numSeats === 4) {
        // Allocate 4 seats in the middle of the row else divide them to left and right
        if (this.isMiddleSectionEmpty(i, middleStart, middleEnd)) {
          this.allocatedSeatLabels.push(...this.allocateMiddleSeats(i, middleStart, numSeats));
          break;
        }
      } else if (numSeats === 3) {
        // Allocate 3 seats continuously if possible, else go to the next row
        if (this.isMiddleSectionEmpty(i, middleStart, middleEnd)) {
          this.allocatedSeatLabels.push(...this.allocateMiddleSeats(i, middleStart, numSeats));
          break;
        } 
      } else if (numSeats === 2) {
        // Allocate 2 seats on the left or right
        // if Two consecutive seats available, allocate on the left
        if (!this.allocatedSeats[i][0] && !this.allocatedSeats[i][1]) {
          this.allocatedSeatLabels.push(...this.allocateEdgeSeats(i, 0, numSeats));
          break;
        }else if (!this.allocatedSeats[i][this.seatsPerRow - 1] && !this.allocatedSeats[i][this.seatsPerRow - 2]) {
          this.allocatedSeatLabels.push(...this.allocateEdgeSeats(i, this.seatsPerRow - 2, numSeats));
          break;
        }
      } else if (numSeats === 1) {
        // Allocate single seat, start from the edge
        let j = 0;
          for (j; j < this.seatsPerRow; j++) {
            if (!this.allocatedSeats[i][j]) {
              this.allocatedSeats[i][j] = true;
              const seatLabel = `${i + 1}${String.fromCharCode(97 + j)}`;
              this.allocatedSeatLabels.push(seatLabel);
              break;
            }
          }
          if(this.allocatedSeats[i][j] == true){
            break;
          }
        
      }
    }

    return this.allocatedSeatLabels;
  }

   // Check for continuous seats available or not in the middle
  isMiddleSectionEmpty(row: number, start: number, end: number): boolean {
    for (let i = start; i <= end; i++) {
      if (this.allocatedSeats[row][i]) return false;
    }
    return true;
  }

  allocateMiddleSeats(row: number, start: number, numSeats: number): string[] {
    const seatLabels: string[] = [];
    for (let i = 0; i < numSeats; i++) {
      this.allocatedSeats[row][start + i] = true;
      seatLabels.push(`${row + 1}${String.fromCharCode(97 + start + i)}`);
    }
    return seatLabels;
  }

  allocateEdgeSeats(row: number, start: number, numSeats: number): string[] {
    const seatLabels: string[] = [];
    for (let i = 0; i < numSeats; i++) {
      this.allocatedSeats[row][start] = true;
      seatLabels.push(`${row + 1}${String.fromCharCode(97 + start)}`);
      start += (numSeats === 2) ? 1 : -1;
    }
    return seatLabels;
  }

}
