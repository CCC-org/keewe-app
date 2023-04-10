# Git strategy - (Github Flow)

**1. 브랜치 생성**

- 브랜치 생성시 다음과 같은 방식으로 브랜치 목적에 맞는 브랜치 헤더를 설정한다.

| 생성 목적 | 브랜치 위치                      |
| --------- | -------------------------------- |
| 기능 개발 | [origin/Feature/{issue_number}]  |
| 버그 픽스 | [origin/Fix/{issue_number}]      |
| 코드 개선 | [origin/Refactor/{issue_number}] |

```
issue_number: 해당 이슈가 진행되는 스프린트에서 할당받은 고유 이슈 번호
```

- 체계적인 분류를 위해 브랜치 이름을 통해 의도를 명확하게 드러낸다.

- 새로운 브랜치는 항상 최신의 main브랜치에서 만든다.

- main브랜치는 항상 최신의 상태로 유지한다.

**2. 개발 & 커밋 & 푸쉬**

- 커밋 메세지를 명확하게 작성한다.

- 원격 브랜치로 수시로 push하여 상황을 공유한다

**3. PR(Pull Request) 생성**

- 피그백이나 도움이 필요할 때 그리고 merge 준비가 완료되었을 때 Pull Request를 생성한다.

- 동료들의 리뷰가 끝난 후 준비가 완료되었다면 main브랜치로 반영을 요구한다

- main 브랜치로 merge될 경우 conflict를 작업중인 브랜치에서 미리 해결하고 진행한다.

- PR생성시 예시

  - PR 제목

  | 생성 목적 | PR 제목                                 |
  | --------- | --------------------------------------- |
  | 기능 개발 | [Feature] [{sprint_name}]:{issue_name}  |
  | 버그 픽스 | [Fix] [{sprint_name}]:{issue_name}      |
  | 코드 개선 | [Refactor] [{sprint_name}]:{issue_name} |

  - PR 설명

  ```
  - Feature:
   - 개발내용
  - Notes:
    - PR리뷰시 주의할점, 추가 전달사항
  ```

**4. 리뷰 & 토의**

- 리뷰와 토의를 상세하게 진행하여 이후 해당 PR이 main으로 merge될 때 문제가 없도록 한다.


**5. 프로젝트 소개**
![ChallengeHome](https://user-images.githubusercontent.com/29995264/230901103-1a4b52f1-6659-45d8-8795-17b3459a6431.png)

- keewe는 사용자들이 자신의 관심사를 기준으로 인사이트 및 게시글을 쉽게 찾아볼 수 있도록 하는 서비스입니다. 또한 챌린지 기능을 제공하여 사용자들이 다른 사람들과 함께 취미를 즐기고 소통할 수 있습니다. 이를 통해 사용자들은 서로 도전하고 격려하며, 서로의 취미와 관심사에 대한 이야기를 나누며 새로운 인연을 만들 수 있습니다.

- keewe는 사용자들의 관심사에 대한 정보를 쉽게 공유하고 소통할 수 있는 플랫폼으로 많은 사람들이 이 서비스를 통해 다양한 인연을 만들고 있습니다.

**6. 주요 기능**

- 피드 스크린  
![KakaoTalk_Video_2023-04-10-21-49-04_AdobeExpress (1)](https://user-images.githubusercontent.com/29995264/230905389-224d683b-d9fe-40d4-93cb-f3655b975cb1.gif)

- 공유하기

- 리액션을 통한 반응하기  
![KakaoTalk_Video_2023-04-10-21-41-46_AdobeExpress](https://user-images.githubusercontent.com/29995264/230903880-ea78fbd2-70e7-43b3-bfd3-db258170707e.gif)
