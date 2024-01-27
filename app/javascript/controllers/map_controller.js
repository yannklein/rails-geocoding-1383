import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    markers: Array,
    apiKey: String
  }
  connect() {
    console.log("hi from map");
    console.log(this.markersValue);
    console.log(this.apiKeyValue);

    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/yannlucklein/cldfa7d1h001s01mwrp3zo4lo"
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
  }

  #addMarkersToMap() {
    this.markersValue.forEach(marker => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)
      const custoMarker = document.createElement("div")
      custoMarker.innerHTML = marker.marker_html
      new mapboxgl.Marker(custoMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([marker.lng, marker.lat]))
    this.map.fitBounds(bounds, {padding: 70, maxZoom: 10, duration: 0})
  }
}
