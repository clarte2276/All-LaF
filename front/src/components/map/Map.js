import { useEffect } from 'react';

import './Map.css';

const { kakao } = window;

const Map = ({ selectedLocation }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.558883838702705, 126.99848057788074), // 고정된 초기 위치
      level: 2,
    };

    const map = new kakao.maps.Map(container, options);

    // 각 위치별로 마커 위치와 클릭 시 표시될 정보 설정
    const locations = {
      infoculture: [
        {
          lat: 37.55967671827378,
          lng: 126.99865881989537,
          message: '정보문화관 P동 3층',
        },
      ],
      newengineering: [
        {
          lat: 37.55828467735671,
          lng: 126.99862489155105,
          message: '신공학관 9층',
        },
        {
          lat: 37.558104477204786,
          lng: 126.99856547673933,
          message: '신공학관 3층',
        },
      ],
      wonheung: [
        {
          lat: 37.55862705908502,
          lng: 126.9988908539538,
          message: '원흥관 3층',
        },
      ],
    };

    const selectedCoordinates = locations[selectedLocation];
    if (selectedCoordinates) {
      selectedCoordinates.forEach((coord) => {
        const markerPosition = new kakao.maps.LatLng(coord.lat, coord.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // InfoWindow에 스타일 적용
        const infoWindow = new kakao.maps.InfoWindow({
          content: `
            <div class="Map_custom-info-window">
              ${coord.message}
            </div>`,
        });

        let isOpen = false;

        // 마커 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
          if (isOpen) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
          isOpen = !isOpen;
        });
      });

      const centerPosition = new kakao.maps.LatLng(selectedCoordinates[0].lat, selectedCoordinates[0].lng);
      map.setCenter(centerPosition);
    }

    map.relayout();
  }, [selectedLocation]);

  return <div id="map" style={{ width: '350px', height: '250px' }}></div>;
};

export default Map;
