import React, {Component, useRef} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Image} from 'react-native-elements';
import Canvas from 'react-native-canvas';
import {set_dimension_of_chart, set_heat_map_data} from '../class/const';

// export interface Algorithm {
//   n_param: number;
//   dimention: number;
//   data: number[];
//   position: number[];
// }

class HeatMap extends React.Component {
  ctx;
  current_algorithm = {
    n_param: 2,
    dimention: 100,
    data: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAGBAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBlFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABS0UUAFFFFABRRRQAlFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUALRRRQAUUUUAFFFFABRRRQAlFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRS0AFFFFABRRRQAUUUUAFFFFABRRRQAlFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKUc8UlABS4p4X5elLs+YKOuKQyKiplizSMAOACaAIqKdsOccU9YGPXgUCIqKs+QPWl8gdM4FAyrRVvyUHUZprqB91Rj3oAr0U87fSmUCCiiigAooooAKKKKACiiigAooooAKKKKAEooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFPQZRqABVLdKlMX/16Il+UGpqQxqrhQKcB3opaBjSKg2s7AAYFWDQBimIRI1TpTqTNGaAFozTSaQGkA+kIzRS0AMMSntTTAPWpQMDFIxIFMCFocdKiKEdjUzO3TB/KmHcOe1ICKinkZPrTcUCEooooAKKKKACilooAKKKKAG0UUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKWpUTI4xmgCMDmrCRgfiKXywRyMH2p6jAxSGMiUoCD60+ikJoAM0oNNxkUUDHZpCaM0h60xBmiikJxQAh604CmrknNPzSGLS02loAWiiigQwyDOFBJoALfeAFPAxQaYDBEoOaPKWnZoBoAhkhxkg1DVqU4WqppAJS0UUCCiiigAooooAbRRRTAKKKKACiiigAooooAKKKKACiiigAooooAKKWigBKKWigBKKWigApKWigBKKWigBKKWigBKKWigBKWinKue+PrQA0CnLuX1AqZYlPXB+lSqgXoKBjY2yOadS4ppoAU0hpCcU0nPGaAHA80tM6UFsDNAC7vakJz9KNoPel2jGKAE6Cm5ycU/bSYxQAvPtSA+lJuyenFBz2FIY7Jpaj5pyk0ASUtNFLQAtJmlpGHFMRExyeDT14HNNVfm5pzttGaQyKZsnFRUrHJzSUCCiiigQUUUUAFFFFADaKKKYBRRRQAUUUUAFFFFABRS0UAJS0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAAEnAqdIjnJpYVUc9TUwOaBiABelLmiigApDQaQ0ANPFN69qdSUAJ7GlI4oFITjrQAZwpoDEimMSozT1+79aAFBal3etRlsHFODZHvQApGfak49aTcR1FKMGgAwPWjpQeDSgikMVTT6j/GgtQBJS0xWzTxQIb0qGRu2amfhScVVPNACUUUUCCiiigAooooAKKKKAG0UUUwCiiigAooooAKKWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApR1pKfGMtQBOgwuKfg4pqjinAYoGLRRSUABphNOppoATdzRwabgiigBelFFNYkGgBWHFBOBRnIpoBPWgBPvNSkYoUYJwKU89qAEDDuKUgg5HSkwBTlOfpQA48imAU5eBRQAho60daXigBydafTV9qVvUUhgzbevSonQE5BwfSlkOBkdDUQYjjtQIaRg4opSc0lAgooooAKKKKACiiigBtFFFMAooooAKKWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKmiHOO9RAZPFWEUIPegCQUtJ0pCaBik00n3oPNJgUALnNFAwKDQAmKSlJptAB+NISKOKTGe1AC4pAOKM9qOo4pgKOKWmAN3FPCUAJgUopdtGMUAFNJxQTUUhOKQA02OByaYkpz8wzUTEg00k9qANGFg4yBUhqvaHEJz61P9aQxpjB9aY0QHephS0CKhXFJirTKCKruuD0xQAyilxRQISilooAKKKKAGUUUUwCloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBynaN3ftU0OTyag6kVZiGEoGONIaU0w0AHU06mClzQA7NJmm5yfalzTAKbyaUmikAmMUE9hS00daYChaULSilFAAFp1ApaBDaQinUUAROKYy5BqYjim4oGVHiNMEbEgVdYYpuB6UgHxoFTAOacDRHihkyc5pDFDU4EGocEGnDNMRLimsCR0pQfWloArOhBplWyobqKhkixyKQEVFGKKBBRRRQAyloopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOXlhVkdKrJ96pt2OKBjzTT604dKa3SgBKQ9KbuyRUgGRQAzpS0MMUlAC0E0E4FQNLg4FMCYtSZqs0rZ61JG27jvSAnU08VGAc8VIOlMBwpaQUZoELSZqJ5MGozNQMsgg0hFNj4UVJ1FAEZFRkHPFTUmMUAImRT6bmnCkAhFJTjTTTAcKUUwGnCkA6kJGOaWkIyKAKz4zxTafIpU0ykAUUUUCG0UUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKWikADg04Hmm0oPNMCcNnNMc7jgUikmpUQKMkc0DBIwOT1p3ApGao2amArHmkNM3YNKTSGK+Sp29apOCrYNXFNJLGHHTmmIo1at170wQ4NWFAUYFAEgpRTV6U6gAZsCmeZTZSRxioN1AD3bJqKMZfJpSaEPze1AFpTxTw1QbxTlbmhgT470Ypu8Bgnc06kAYoFANBpgFNNOpDQAgpRTaUGkA8Glpoo6UAMlBxUFTu3FQUgCiiigQ2iiimAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUtIAooooAKKKKACgUUqDLAUATxrtXJ60M1PPAqFjTGBamE0E4pACaRSQhp1GKkVO5oQMag70rU80w0yRcZFMbipQMCk280ANjzjmn0UtMAPIqJ4wal7VE7UCK7rjvTVU445p75NSIRsxQNEJJHUVLEMnJ6Ufe4A/Gnxkq3zAYHSpuOw5eZtxFTVGvJzTzTQMDRmkzQKYh1BpM0GgBppRSU5RSYA+McnFRhyG2nkU6bpUNIBzmmUuaSgAooooENooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAtFFFIAooooAKKKKACiiigAqaBerGoRyatKMLTGNdqhJqRwTTQlA0NAz1p2KcFooC4Kozk0800U6gQ00gHNONGKAFFFAopgJS0UUAIelQPU55FQNGc8UAR5ycCnB9q4FIVIppBpWAeZCaRWLGmbT3p6cGiwFqPgU5/Wo4zUpIPFAEW6lBzQVpBxTAdmlpuaKAF709ajHWpBSAGGVIqswwcVaqGYYbNICKiiigQUUUUANooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFIBaKKKACiiigAooooAKKKKACiiigBRwalEoxUNFAyfetNLioqKAJC9N3mm0UASx+tSVEGwAB1qUdKYATSUoFFMAFFJS0ALSUtJQAGkoJppNAAyio2Wpe1NJoAgIpQKeabmlcCVCFGTSK+WqPOaBxSGWM5ph60gagmmIXNLmm0A5oAcp5qUYIqILT0oGPximyLuXjrShqUGkBVIxSVNInOaiNAhKKKKBDaKKKYBRRRQAUUUUAFFFFABRRRSAKKKKACiiigApaKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAcvWpxyKripkOaYx1JS0lMBKUGkNJmgB+aM00GigBTTe9LTSaAHE1E9PJ4phpAMpueaeeBULdaQx24Zp4NRAUozQBMDS5qEE07mgB5b0py01RQSQfamIsKfWlOKhU5FOyaAHmgGk7UmaQyQ8ioXGO1SqaHGRQIr0lOYYOKSgBlFFFMQUUUUgCiiigAooooAKKKKACiiigApaSloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopaACnxn5qZQDg5oGWaSkVsilNUA000049abSAAcU4HNNFL0pgBppp2aSkA00hpTTWNAxGNQnrmnnJo20gGinUoFKBmgBMU4cdqXp2pQc0wAEYpQKQjB4FOHrQIMAdKUGkxzSigB1FFJmgB608VEDUgoAa6A1CV5qyDTXXNAFSiiikIKKKKACiiigAooooAKKKKACiiloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAWiiigAooooAcjYNTdRVepFfApjFY4FN3UO2RTKAHA08cioqkD8UAKRSEUvbNJigBpFJt4p+KMUAR47UY5FOP3qVhQBHjDYpRwcGlxnrSc9DQMcKQ4pccdKBzQIO9BXuKBzS5xQAD3paQn2oHrQA4GikzS5oAUU8HimU4dKAF3YNOBzTKVTigCpRRRSEFFFFABRRRQAUUUUAFFFFABS0lLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABS0UUAFFFFABRRRQAUUUUDCiiigAooooAfGecU/FQ9KmByM0wCk70ZpKAEPc0hPFKelBFACdxSEenWjqcUL1xQA7PFN6Gn0hoASgUnHal6c0ALyOKMUZz0NHfrQAopc0hJoFMB2KUUgpaQAeaUCmnmlHFAFaiiikIKKKKACiiigAooooAKKKWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiloAKKKKACiiigAooooGFFFFABRRRQAUUUUAFORsHB6U2igCXFIRSqcilNMBoGBSd6U0mOaAGkfOKUj5vegjmigBe9ITzg0fWk5oAXjtQDzQBg80ECgBTxzSHpRwaPbFAC0dKB0o4NADhS0zpTqAFpcU3PNOB96AK1FFFIQUUUUAFFFFABRRRQAUtFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFLRRQAUUUUAFFFFAwooooAKKKKACiiigAooooAKKKKAHIcNUpqCpUORjuKaAWkNKaQimA00enrSkU0+1IAz1FIOBRjk0YNAC/Sj60YwcilNAAR6Ug6+9GO4oJ70AKDg4oI5yKQ9M04HIoATNAoIzyOtNPPSgB/BFJnaetMHH0p3BFAEdFFFIQUUUUAFFFFABRRRQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUALRRRQMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAClU4OaSigCbqMig02M9jTjTATHFNx2p1JTATvScjrSng5pDSAKTvg04cUhJFADh0poyQQaXdQfUUwEHpS9DSH1peopAL7imkdxQDSk4NADPcdKX6UMCORQDQMZRRRSEFFFFABRRRQIKWiigAooooAKKKKACiiigAooooAKKKKBhRRRQIKKKKBhRRRQAUUUUALRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACg4NSK2761FSg4NAEtNNOByM0VQDD+lJ3x+VKc9KCKQCZwcGkPWjvRQA/NN20hHFKPrTAU8Dmk6DNL1pp4oAXrQPQ0lKaQB0+lIR6Gl6igigCOiiikAUUUUAFFFFAhaKKKACiiigAooooAKKKKACiiigAooooGFFFFABRRRQAUUUUAFFFFAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUASR9DTqKKaATvTW+6aKKYDT92haKKQCigUUUwF7mmHtRRSAVulC9KKKAFHSlPSiimB//2Q==',
    position: [],
  };

  COLOR_MAP = [
    [0, 'blue'],
    [1, '#06f'],
    [2, '#0cf'],
    [3, '#0fc'],
    [4, '#0f6'],
    [5, 'lime'],
    [6, '#6f0'],
    [7, '#cf0'],
    [8, ' #fc0'],
    [9, '#f60'],
    [10, 'red'],
    [11, 'red'],
  ];

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    // this.ctx = this.ref.current.getContext('2d');
    // this.ctx.canvas.width = Dimensions.get('window').width * 0.78;
    // this.ctx.canvas.height = Dimensions.get('window').height;
    // console.log('width', this.ctx.canvas.width);
    // this.createRectangle(this.getRandomInt(10, 50), 50, 50, 50, 'white');
    // this.forceUpdate();
  }

  draw_heat_map(algorithm) {
    // this.createRectangle(this.getRandomInt(50, 50), 50, 100, 50, 'white');
    // this.current_algorithm = algorithm;
    // set_heat_map_data(this.current_algorithm.data);
    // set_dimension_of_chart(this.current_algorithm.dimention);
    // console.log('draw ++++++++++++++++++++++', this.current_algorithm.data);
    // this.clear_canvas();
    // dx = this.ctx.canvas.width / algorithm.dimention;
    // dy = this.ctx.canvas.height / algorithm.dimention;
    // index_x = 0;
    // index_y = 0;

    // for (var i = 0; i < Math.pow(algorithm.dimention, algorithm.n_param); i++) {
    //   x = index_x * dx;
    //   y = index_y * dy;

    //   this.createRectangle(
    //     dx,
    //     dy,
    //     x,
    //     y,
    //     this.getHeatColor(this.current_algorithm.data[i][1]),
    //   );

    //   index_x++;
    //   if (index_x >= algorithm.dimention) {
    //     index_x = 0;
    //     index_y++;
    //   }
    // }

    this.forceUpdate();
  }

  clear_canvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.forceUpdate();
  }

  getHeatColor(data) {
    if (data < 0) {
      return this.COLOR_MAP[0][1];
    } else {
      for (i = 1; i < this.COLOR_MAP.length - 1; i++) {
        if (data >= this.COLOR_MAP[i][0] && data <= this.COLOR_MAP[i + 1][0]) {
          return this.COLOR_MAP[i][1];
        }
      }
    }
    return this.COLOR_MAP[0][1];
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createRectangle(dx, dy, posX, posY, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(posX, posY, dx, dy);
  }

  render() {
    return (
      <View>
        <View>
          <Text variant="titleLarge"> HeatMap </Text>
        </View>
        <View>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${this.current_algorithm.data}`,
            }}
            style={this.styles.box}
          />
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    box: {
      width: '100%',
      height: '100%',
    },
    canvas_box: {
      // backgroundColor: 'pink',
      width: '100%',
      height: '100%',
    },
  });
}

export default HeatMap;
