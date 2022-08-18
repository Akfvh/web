# Memory Game
[유튜브 튜토리얼](https://www.youtube.com/watch?v=ec8vSKJuZTk&t=1791s) 을 보고 진행한 Memory Game 만들기.  

## Features
- 총 6쌍의 이미지들에 대한 짝 맞추기 게임.
- click -> 카드 뒤집기
- 두개의 카드를 뒤집었을 때 Alert
    - 짝이 맞았을 경우
    - 짝이 안 맞았을 경우
    - click 1에서 고른 카드를 다시 클릭했을 경우
- 정답 로그
    - 짝을 맞췄을 때, 자신이 어떤 그림을 맞췄는지 누적되어 표시 - 22/08/18  
<br><br>

## TO-Do
- 카드의 개수, 배치 수정 
- 로그 다양화
    - 맞춘 그림들만 기록
    - 클릭한 그림, 정답 여부 모두 기록
    - 플레이를 돕기 위해 이전에 틀린 그림과 위치 기록
- css Grid 활용, 창 축소/확대에 따른 resizing지원  
<br><br>

## 느낀 점
- `html`: 많이 익숙해졌다. `div`, `span` 태그를 어떤 용도로 사용하는 지 감이 많이 잡혔다.
- `css`: 이전보다 나아졌다. `grid`와 `flex`의 활용도가 상당히 높은 것 같다. 사용해봐야할 것 같다.
- `javascript`: 어떤 방식으로 코드를 쓰는 지 머리에 더 잘 들어왔다. `html`파일 작성 시 `class`, `id`, 그리고 `data`를 어떻게 설정할 지 충분히 고려해야 할 것 같다.
    - `selector`개념이 잡혀간다.
    - `console.log`와 `live-server`가 상당히 유용했다.
    - `setAttribute`를 공부해봐야할 것 같다.