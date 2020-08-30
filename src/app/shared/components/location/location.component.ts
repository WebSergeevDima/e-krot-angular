import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locationList: any[]
  locationSelected = localStorage.getItem('location')

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    //console.log('debug Loc', this.locationService.getLocationList())
    this.locationList = this.locationService.getLocationList()
    this.locationSelected = this.locationService.getLocation()
  }

  locationChange() {
    this.locationService.setLocationSelected(this.locationSelected)
  }
}
