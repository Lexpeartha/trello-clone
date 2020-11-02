export function generateUid() {
  return Math.random()
    .toString(16)
    .slice(2);
}

export const saveStatePlugin = store => {
  store.subscribe((mutations, state) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
};
