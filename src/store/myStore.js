var myStore = {
    debug: true,
    state: {
      msg: "hello"
    },
    setMsgAction(newValue) {
        console.log(newValue);
    //   if (this.debug) console.log("setMsgAction trigged with ", newValue);
    //   this.state.msg = newValue;
    },
    clearMsgAction() {
    //   if (this.debug) console.log("clearMsgAction trigged");
    //   this.state.msg = "";
    }
  };
export default myStore;