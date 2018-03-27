class Log {
  constructor () {
    this.colors = { Reset : "\x1b[0m",
                    Bright : "\x1b[1m",
                    Dim : "\x1b[2m",
                    Underscore : "\x1b[4m",
                    Blink : "\x1b[5m",
                    Reverse : "\x1b[7m",
                    Hidden : "\x1b[8m",

                    FgBlack : "\x1b[30m",
                    FgRed : "\x1b[31m",
                    FgGreen : "\x1b[32m",
                    FgYellow : "\x1b[33m",
                    FgBlue : "\x1b[34m",
                    FgMagenta : "\x1b[35m",
                    FgCyan : "\x1b[36m",
                    FgWhite : "\x1b[37m",

                    BgBlack : "\x1b[40m",
                    BgRed : "\x1b[41m",
                    BgGreen : "\x1b[42m",
                    BgYellow : "\x1b[43m",
                    BgBlue : "\x1b[44m",
                    BgMagenta : "\x1b[45m",
                    BgCyan : "\x1b[46m",
                    BgWhite : "\x1b[47m"
        };

        this.logcolor =  `${this.colors.FgWhite}%s${this.colors.Reset}`;
        this.infocolor =  `${this.colors.FgCyan}%s${this.colors.Reset}`;
        this.successcolor =  `${this.colors.FgGreen}%s${this.colors.Reset}`;
        this.warningcolor =  `${this.colors.Bright}${this.colors.FgYellow}%s${this.colors.Reset}`;
        this.errorcolor =  `${this.colors.Bright}${this.colors.FgRed}%s${this.colors.Reset}`;
      }

      log (msg) {
        console.log(this.logcolor, msg);
      }

      info (msg) {
        console.log(this.infocolor, msg);
      }

      success (msg) {
        console.log(this.successcolor, msg);
      }

      warn (msg) {
        console.log(this.warningcolor, msg);
      }

      error (msg) {
        console.log(this.errorcolor, msg);
      }

      byCode(msg, code) {
        if (code === 404) {
          this.error(msg);
        } else {
          this.success(msg);
        }
      }
}

module.exports = new Log();
