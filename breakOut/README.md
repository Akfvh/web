# BREAKOUT
벽돌깨기 게임.  
<br><br>  

## Features
- 키보드 좌,우 키를 이용해 막대를 움직여 플레이
- 막대의 양 끝 빨간 부분에 닿으면 공 속도 증가
- 공을 받지 못하거나 벽돌을 다 부수면 게임 종료  
<br>
<img src="img1.png" width="500px" alt="게임 화면">실행 화면</img>
<br>


## To-Do
- 부술 때 특정 기능(공 추가, 속도 변화 등)을 추가하는 블럭 생성
- 막대에 더 다양한 기능(길이 변화, 공 잡기) 등 추가  
<br>

## 느낀 점
- `html`: 새로웠다. 기본적인 게임 전체 판을 그릴 때만 사용하고 나머지 요소들은 `javascript`에서 추가로 생성했다.  

- `css`: 평이했다. 
    - `whac-a-mole`에서 처음 사용했었던, 클래스를 미리 만들고, `javascript`를 이용해 해당 클래스를 동적으로 부여하는 식의 기능을 적극 활용했다.
    - `grid`와 `.nth-child`를 이용해 막대의 양 끝을 직접 구현해봤다.  
    <br>

- `javascript`: 배울 게 많았다.
    - `document.createElement` <br><br>

    ```    
    1. foo = document.createElement('div 등')     // element 생성
    2.  foo.Classlist.add('정의해놓은 class') // class 추가
    3.  bar.appendChild(foo)  // 존재하는 요소 'bar' 내부에 해당 element를 추가
    ```  


    의 방식으로 대부분 요소들을 생성했다.  
    <br>

    - `windows.requestAnimationFrame`  

        튜토리얼의 기존 코드 그대로 구현했을 때, 방향키를 꾹 눌렀을 때, 매끄럽게 막대가 이동하지 않고, 첫 `keydown` 뒤의 약간의 딜레이 후에 막대가 쭉 이동했다.

        해결을 위해 [이 글](https://jsfiddle.net/bc_rikko/wrvv5k1k/)을 참고했다.

        우선 프로젝트 마무리를 먼저 하고 싶어서 코드만 가져다가 유사하게 사용했지만, 나중에 그 원리를 따로 정리해보고자 한다.  
        <br>

    - 요소 그리기
    ```
    foo.style.left = [n]px
    foo.style.bottom = [n]px
    ```
    의 방식으로 화면에 요소를 배치시켰다.  
    <br>
    - `setInterval`

    `setIntrval()`와 `clearInterval()`을 이용해 공의 이동을 구현했다.
