export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJpbWFyeXpvbmUiLCJhIjoiY2txN3R4ZmE1MDlsbTJ3bXZkdjA0dDZ2eSJ9.QjSVaOMD6BV5nu8WHMrOTg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/primaryzone/ckq8ytzxt0rah17q37licpapr',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';
    // add marker
    new mapboxgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to incude cuttent location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
