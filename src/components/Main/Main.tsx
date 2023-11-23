import React from 'react'
import st from './Main.module.scss'

const Main: React.FC = () => {
  return (
    
      <div className={st.wrapper}>
      <h1>Релиз 2</h1>
      <ul>
        <li className={st.mainList}>Исправил 404 при переходе на страницу.</li>
        <li className={st.mainList}>Реализовал "фейковый" асинхронный функционал запросов.</li>
        <li className={st.mainList}>Данные на страницу просмотра перебросил через props.</li>
        <li className={st.mainList}>На странице просмотра реализовал сортировку, добавил возможность перехода глубже выбранного уровня.</li>
        <li className={st.mainList}>Разнёс стили по модулям. Привёл стили в порядок.</li>
        <li className={st.mainList}>Типизировал данные TypeScript.</li>

        </ul>
        </div>
    
  )
}

export default Main;
