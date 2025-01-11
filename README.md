# 업무작업대 (Workbench)

_업무 능률 향상을 위한 다목적 기능을 담은 Mac 및 Window 어플리케이션_

![](./screenshot.png)

## 배포내역

| 버전                                                      | 변경사항                                | 상태   | 배포일자   |
| --------------------------------------------------------- | --------------------------------------- | ------ | ---------- |
| [v1.0](https://github.com/minsang8332/workbench/releases) | 문서 편집하기                           | 완료   | 2023.11.20 |
| v1.1                                                      | 목표 관리하기 기능, <br> Dock 메뉴 <br> | 완료   | 2024.09.20 |
| v1.1.1                                                    | 환경설정, 해야 할 일 스프린트           | 완료   | 2025.01.11 |
| v1.2                                                      | 웹 자동화                               | 진행중 | 2025.01    |
| v1.3                                                      | 백색소음 빗소리 음악 ASMR 기능          |        |            |
| v1.4                                                      | 날씨 확인하기 기능                      |        |            |

## 설치하기

> node 16.20.1^
> node 18.20.2^ (추천)

```
// 설치하기
npm run setup

// 개발하기
npm run serve

// 윈도우 어플리케이션 빌드
npm run build

// 윈도우 어플리케이션 배포 (환경변수 GH_TOKEN 필요)
npm run deploy
```

### 그 외 부가 명령어

```
// input 경로의 아이콘을 electron 전용 아이콘들로 일괄 생성
npm run icon
```
