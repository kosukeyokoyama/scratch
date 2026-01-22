class Test {
  constructor() {
    // データを保存するためのメモリ代わりのオブジェクト
    // 本来は外部DBとかを使いたいところだが、まずはローカル変数で管理だ！
    this.storage = {};
  }

  getInfo() {
    return {
      id: 'test',
      name: 'Data Logger Extension',
      blocks: [
        {
          opcode: 'manageData', // 実行される関数名
          blockType: Scratch.BlockType.COMMAND,
          text: 'データを [MODE] する (ID: [ID]) 内容: [DATA]',
          arguments: {
            MODE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'modeMenu', // 下で定義するメニューを使用
              defaultValue: 'write'
            },
            ID: {
              type: Scratch.ArgumentType.STRING, // 識別番号
              defaultValue: '001'
            },
            DATA: {
              type: Scratch.ArgumentType.STRING, // 記録するデータ
              defaultValue: 'some data'
            }
          }
        }
      ],
      menus: {
        modeMenu: {
          acceptReporters: false,
          items: ['write', 'read'] // ここで選択肢を固定
        }
      }
    };
  }

  // ブロックが実行された時の処理
  manageData(args) {
    const mode = args.MODE;
    const id = args.ID;
    const data = args.DATA;

    if (mode === 'write') {
      // データの書き込み処理
      this.storage[id] = data;
      console.log(`[Save Success] ID: ${id} にデータを書き込んだぜ: ${data}`);
    } else if (mode === 'read') {
      // データの読み出し処理
      const result = this.storage[id] || "データが見つからねぇな...";
      console.log(`[Read Success] ID: ${id} のデータはこれだ: ${result}`);
      // 本来は「値ブロック」にしてScratch側に返したいところだが、
      // 今回はCOMMAND型なのでコンソール出力にとどめてるぜ！
    }
  }
}

Scratch.extensions.register(new Test());
