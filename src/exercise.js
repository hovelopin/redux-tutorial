import { legacy_createStore as createStore } from 'redux';

// 1. 상태를 정의하기
const initialState = {
  counter: 0,
  text: '',
  list: [],
};

// 2. action type 만들기
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

// 3. action 생성 함수
const increase = () => ({
  type: INCREASE,
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

// 4. 액션 생성함수를 통해 리듀서를 만듭니다! ( 이떄 주의할 점은 불변성을 꼭 지켜줘야 합니다. )
// 리덕스가 reducer를 실행할때 기본적으로 state에 initialState를 설정해줘야하는데 이유는 첫 실행할때 state값이 undefined면 오류가 난다.
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    // 배열에 값을 추가할때는 불변성을 유지하기 위해서 push가 아닌 concat을 이용해서 작성한다.
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 5. store 만들기
const store = createStore(reducer);
// getState는 현재 상태를 가져온다.
console.log(store.getState());

// 6. 구독하기
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶으면 unsubscribe() 함수를 호출한다.

// 7. action들을 dispatch하기
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));
