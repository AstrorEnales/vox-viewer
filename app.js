function colorFromIntegerABGR(color) {
    return [
      color & 0xff,
      (color >> 8) & 0xff,
      (color >> 16) & 0xff,
      (color >> 24) & 0xff
    ];
  }

const DEFAULT_PALETTE = [
  0x00000000, 0xffffffff, 0xffccffff, 0xff99ffff, 0xff66ffff, 0xff33ffff,
  0xff00ffff, 0xffffccff, 0xffccccff, 0xff99ccff, 0xff66ccff, 0xff33ccff,
  0xff00ccff, 0xffff99ff, 0xffcc99ff, 0xff9999ff, 0xff6699ff, 0xff3399ff,
  0xff0099ff, 0xffff66ff, 0xffcc66ff, 0xff9966ff, 0xff6666ff, 0xff3366ff,
  0xff0066ff, 0xffff33ff, 0xffcc33ff, 0xff9933ff, 0xff6633ff, 0xff3333ff,
  0xff0033ff, 0xffff00ff, 0xffcc00ff, 0xff9900ff, 0xff6600ff, 0xff3300ff,
  0xff0000ff, 0xffffffcc, 0xffccffcc, 0xff99ffcc, 0xff66ffcc, 0xff33ffcc,
  0xff00ffcc, 0xffffcccc, 0xffcccccc, 0xff99cccc, 0xff66cccc, 0xff33cccc,
  0xff00cccc, 0xffff99cc, 0xffcc99cc, 0xff9999cc, 0xff6699cc, 0xff3399cc,
  0xff0099cc, 0xffff66cc, 0xffcc66cc, 0xff9966cc, 0xff6666cc, 0xff3366cc,
  0xff0066cc, 0xffff33cc, 0xffcc33cc, 0xff9933cc, 0xff6633cc, 0xff3333cc,
  0xff0033cc, 0xffff00cc, 0xffcc00cc, 0xff9900cc, 0xff6600cc, 0xff3300cc,
  0xff0000cc, 0xffffff99, 0xffccff99, 0xff99ff99, 0xff66ff99, 0xff33ff99,
  0xff00ff99, 0xffffcc99, 0xffcccc99, 0xff99cc99, 0xff66cc99, 0xff33cc99,
  0xff00cc99, 0xffff9999, 0xffcc9999, 0xff999999, 0xff669999, 0xff339999,
  0xff009999, 0xffff6699, 0xffcc6699, 0xff996699, 0xff666699, 0xff336699,
  0xff006699, 0xffff3399, 0xffcc3399, 0xff993399, 0xff663399, 0xff333399,
  0xff003399, 0xffff0099, 0xffcc0099, 0xff990099, 0xff660099, 0xff330099,
  0xff000099, 0xffffff66, 0xffccff66, 0xff99ff66, 0xff66ff66, 0xff33ff66,
  0xff00ff66, 0xffffcc66, 0xffcccc66, 0xff99cc66, 0xff66cc66, 0xff33cc66,
  0xff00cc66, 0xffff9966, 0xffcc9966, 0xff999966, 0xff669966, 0xff339966,
  0xff009966, 0xffff6666, 0xffcc6666, 0xff996666, 0xff666666, 0xff336666,
  0xff006666, 0xffff3366, 0xffcc3366, 0xff993366, 0xff663366, 0xff333366,
  0xff003366, 0xffff0066, 0xffcc0066, 0xff990066, 0xff660066, 0xff330066,
  0xff000066, 0xffffff33, 0xffccff33, 0xff99ff33, 0xff66ff33, 0xff33ff33,
  0xff00ff33, 0xffffcc33, 0xffcccc33, 0xff99cc33, 0xff66cc33, 0xff33cc33,
  0xff00cc33, 0xffff9933, 0xffcc9933, 0xff999933, 0xff669933, 0xff339933,
  0xff009933, 0xffff6633, 0xffcc6633, 0xff996633, 0xff666633, 0xff336633,
  0xff006633, 0xffff3333, 0xffcc3333, 0xff993333, 0xff663333, 0xff333333,
  0xff003333, 0xffff0033, 0xffcc0033, 0xff990033, 0xff660033, 0xff330033,
  0xff000033, 0xffffff00, 0xffccff00, 0xff99ff00, 0xff66ff00, 0xff33ff00,
  0xff00ff00, 0xffffcc00, 0xffcccc00, 0xff99cc00, 0xff66cc00, 0xff33cc00,
  0xff00cc00, 0xffff9900, 0xffcc9900, 0xff999900, 0xff669900, 0xff339900,
  0xff009900, 0xffff6600, 0xffcc6600, 0xff996600, 0xff666600, 0xff336600,
  0xff006600, 0xffff3300, 0xffcc3300, 0xff993300, 0xff663300, 0xff333300,
  0xff003300, 0xffff0000, 0xffcc0000, 0xff990000, 0xff660000, 0xff330000,
  0xff0000ee, 0xff0000dd, 0xff0000bb, 0xff0000aa, 0xff000088, 0xff000077,
  0xff000055, 0xff000044, 0xff000022, 0xff000011, 0xff00ee00, 0xff00dd00,
  0xff00bb00, 0xff00aa00, 0xff008800, 0xff007700, 0xff005500, 0xff004400,
  0xff002200, 0xff001100, 0xffee0000, 0xffdd0000, 0xffbb0000, 0xffaa0000,
  0xff880000, 0xff770000, 0xff550000, 0xff440000, 0xff220000, 0xff110000,
  0xffeeeeee, 0xffdddddd, 0xffbbbbbb, 0xffaaaaaa, 0xff888888, 0xff777777,
  0xff555555, 0xff444444, 0xff222222, 0xff111111,
].map((c) => colorFromIntegerABGR(c));

class MemoryStream {
  constructor(buffer) {
    this.buffer = buffer;
    this._byteLength = buffer.byteLength;
    this.view = new DataView(this.buffer);
    this._position = 0;
  }

  byteLength() {
    return this._byteLength;
  }

  position() {
    return this._position;
  }

  seek(position) {
    this._position = Math.max(0, Math.min(this._byteLength, position));
  }

  readUint8() {
    this._position++;
    return this.view.getUint8(this._position - 1);
  }

  readInt8() {
    this._position++;
    return this.view.getInt8(this._position - 1);
  }

  readUint16() {
    this._position += 2;
    return this.view.getUint16(this._position - 2, true);
  }

  readInt16() {
    this._position += 2;
    return this.view.getInt16(this._position - 2, true);
  }

  readUint32() {
    this._position += 4;
    return this.view.getUint32(this._position - 4, true);
  }

  readInt32() {
    this._position += 4;
    return this.view.getInt32(this._position - 4, true);
  }

  readFloat32() {
    this._position += 4;
    return this.view.getFloat32(this._position - 4, true);
  }

  readBytes(length) {
    const result = new Uint8ClampedArray(
      this.buffer.slice(this._position, this._position + length)
    );
    this._position += length;
    return result;
  }

  readNextRiffId() {
    return String.fromCharCode(
      this.readUint8(),
      this.readUint8(),
      this.readUint8(),
      this.readUint8()
    );
  }

  readString() {
    const byteLength = this.readInt32();
    return byteLength > 0
      ? String.fromCharCode(...this.readBytes(byteLength))
      : '';
  }

  readDict() {
    const numPairs = this.readInt32();
    const dict = {};
    for (let i = 0; i < numPairs; i++) {
      dict[this.readString()] = this.readString();
    }
    return dict;
  }
}

window.addEventListener('load', function() {
  var input = document.getElementById('voxInput');
  input.addEventListener('change', function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      const canvasContainer = document.getElementById('canvasContainer');
      const sceneGraphContainer = document.getElementById('sceneGraphContainer');
      const outputContainer = document.getElementById('fileStructureContainer');
      canvasContainer.innerHTML = '';
      sceneGraphContainer.innerHTML = '';
      outputContainer.innerHTML = '';
      const modelSizes = [];
      const modelGrids = [];
      const nodes = {};
      let palette = DEFAULT_PALETTE;
      const stream = new MemoryStream(this.result);
      let outputText = '';
      if (stream.readNextRiffId() === 'VOX ') {
        outputText += 'Valid VoX file\nVOX version: ' + stream.readInt32() + '\n';
        while (stream.position() < stream.byteLength()) {
          const riffId = stream.readNextRiffId();
          const contentByteLength = stream.readInt32();
          /*const childrenByteLength = */ stream.readInt32();
          const currentPosition = stream.position();
          outputText += 'Chunk: ' + riffId + '\n';
          if (riffId === 'PACK') {
            const numModels = stream.readInt32();
            outputText += '\tnum models: ' + numModels + '\n';
          } else if (riffId === 'SIZE') {
            const x = stream.readInt32();
            const y = stream.readInt32();
            const z = stream.readInt32();
            modelSizes.push([x, y, z]);
            outputText += '\tsize: [' + x + ', ' + y + ', ' + z + ']\n';
          } else if (riffId === 'XYZI') {
            const numVoxels = stream.readInt32();
            outputText += '\tnum voxels: ' + numVoxels + '\n';
            const size = modelSizes[modelSizes.length - 1];
            const grid = new Array(size[0] * size[1] * size[2]);
            for (let i = 0; i < numVoxels; i++) {
              const x = stream.readUint8();
              const y = stream.readUint8();
              const z = stream.readUint8();
              const color = stream.readUint8();
              grid[x + y * size[0] + z * size[0] * size[1]] = color;
            }
            modelGrids.push(grid);
          } else if (riffId === 'NOTE') {
            const numColorNames = stream.readInt32();
            outputText += '\tnum color names: ' + numColorNames + '\n';
            for (let i = 0; i < numColorNames; i++) {
              outputText += '\t' + i + ': "' + stream.readString() + '"\n';
            }
          } else if (riffId === 'rCAM') {
            outputText += '\tcamera id: ' + stream.readInt32() + '\n';
            outputText += '\tcamera properties: ' + JSON.stringify(stream.readDict()) + '\n';
          } else if (riffId === 'rOBJ') {
            outputText += '\trendering attributes: ' + JSON.stringify(stream.readDict()) + '\n';
          } else if (riffId === 'MATL') {
            outputText += '\tmaterial id: ' + stream.readInt32() + '\n';
            outputText += '\tmaterial properties: ' + JSON.stringify(stream.readDict()) + '\n';
          } else if (riffId === 'MATT') {
            outputText += '\tmaterial id: ' + stream.readInt32() + '\n';
            outputText += '\tmaterial type: ' + stream.readInt32() + '\n';
            outputText += '\tmaterial weight: ' + stream.readFloat32() + '\n';
            const materialBits = stream.readInt32();
            bits = [];
            for (let i = 0; i < 8; i++) {
              bits.push((1 << i) & materialBits);
            }
            outputText += '\tmaterial property bits: ' + materialBits + ' -> ' + bits.reverse().join('') + '\n';
            const bitNames = ['Plastic', 'Roughness', 'Specular', 'IOR', 'Attenuation', 'Power', 'Glow', 'isTotalPower (*no value)'];
            for (let i = 0; i < 8; i++) {
              if (bits[i] === 1) {
                outputText += '\t' + bitNames[i] + ': ' + (i < 7 ? stream.readFloat32() : '') + '\n';
              }
            }
          } else if (riffId === 'nTRN') {
            const nodeId = stream.readInt32();
            const nodeProperties = JSON.stringify(stream.readDict());
            const childNodeId = stream.readInt32();
            // reserved id, must be -1
            stream.readInt32();
            const layerId = stream.readInt32();
            const numFrames = stream.readInt32();
            const frameProperties = new Array(numFrames);
            for (let i = 0; i < numFrames; i++) {
              frameProperties[i] = JSON.stringify(stream.readDict());
            }
            outputText += '\tnode id: ' + nodeId + '\n';
            outputText += '\tnode properties: ' + nodeProperties + '\n';
            outputText += '\tchild node id: ' + childNodeId + '\n';
            outputText += '\tlayer id: ' + layerId + '\n';
            outputText += '\tnum frames: ' + numFrames + '\n';
            for (let i = 0; i < numFrames; i++) {
              outputText += '\tframe ' + i + ': ' + frameProperties[i] + '\n';
            }
            nodes[nodeId] = {
              type: 'TRN',
              id: nodeId,
              properties: nodeProperties,
              childNodeId: childNodeId,
              childIds: [childNodeId],
              layerId: layerId,
              frameProperties: frameProperties,
            };
          } else if (riffId === 'nGRP') {
            const nodeId = stream.readInt32();
            const nodeProperties = JSON.stringify(stream.readDict());
            const numChildren = stream.readInt32();
            const childIds = new Array(numChildren);
            for (let i = 0; i < numChildren; i++) {
              childIds[i] = stream.readInt32();
            }
            outputText += '\tnode id: ' + nodeId + '\n';
            outputText += '\tnode properties: ' + nodeProperties + '\n';
            outputText += '\tnum children: ' + numChildren + '\n';
            outputText += '\tchild node ids: ' + JSON.stringify(childIds) + '\n';
            nodes[nodeId] = {
              type: 'GRP',
              id: nodeId,
              properties: nodeProperties,
              childIds: childIds,
            };
          } else if (riffId === 'nSHP') {
            const nodeId = stream.readInt32();
            const nodeProperties = JSON.stringify(stream.readDict());
            const numModels = stream.readInt32();
            const modelIds = new Array(numModels);
            const modelProperties = new Array(numModels);
            for (let i = 0; i < numModels; i++) {
              modelIds[i] = stream.readInt32();
              modelProperties[i] = JSON.stringify(stream.readDict());
            }
            outputText += '\tnode id: ' + nodeId + '\n';
            outputText += '\tnode properties: ' + nodeProperties + '\n';
            outputText += '\tnum models: ' + numModels + '\n';
            for (let i = 0; i < numModels; i++) {
              outputText += '\tmodel id: ' + modelIds[i] + '\n';
              outputText += '\tmodel properties: ' + modelProperties[i] + '\n';
            }
            nodes[nodeId] = {
              type: 'SHP',
              id: nodeId,
              properties: nodeProperties,
              childIds: [],
              modelIds: modelIds,
              modelProperties: modelProperties,
            };
          } else if (riffId === 'LAYR') {
            outputText += '\tlayer id: ' + stream.readInt32() + '\n';
            outputText += '\tlayer properties: ' + JSON.stringify(stream.readDict()) + '\n';
            // reserved id, must be -1
            stream.readInt32();
          } else if (riffId === 'IMAP') {
            for (let i = 0; i < 256; i++) {
              outputText += stream.readUint8() + (i < 255 ? ', ' : '');
              if ((i + 1) % 16 === 0) {
                outputText += '\n';
              }
            }
          } else if (riffId === 'RGBA') {
            const customPalette = [[0, 0, 0, 0]];
            for (let i = 0; i < 256; i++) {
              const r = stream.readUint8();
              const g = stream.readUint8();
              const b = stream.readUint8();
              const a = stream.readUint8();
              const color = [r, g, b, a];
              if (i === 255) {
                customPalette[0] = color;
              } else {
                customPalette.push(color);
              }
            }
            palette = customPalette;
            for (let i = 0; i < 256; i++) {
              outputText += '<div class="color-box" style="background-color: rgb(' + customPalette[i][0] + ',' + customPalette[i][1] + ',' + customPalette[i][2] + ')"></div>';
              if ((i + 1) % 64 === 0) {
                outputText += '\n';
              }
            }
          }
          if (currentPosition + contentByteLength != stream.position()) {
            stream.seek(currentPosition + contentByteLength);
          }
        }
        try {
          for (let i = 0; i < modelSizes.length; i++) {
            const surface = document.createElement('canvas');
            surface.style.width = '200px';
            surface.style.height = '200px';
            surface.style.border = '1px solid grey';
            surface.width = 200;
            surface.height = 200;
            canvasContainer.appendChild(surface);
            const context = surface.getContext('2d');
            context.fillStyle = '#000000';
            context.fillRect(0, 0, 200, 200);
            const voxelSize = 200.0 / Math.max(modelSizes[i][0], modelSizes[i][1], modelSizes[i][2]) * 0.5;
            const voxelDiagY = voxelSize * Math.sin(30 * (Math.PI / 180.0));
            const voxelDiagX = Math.sqrt(voxelSize**2 - voxelDiagY**2);
            const cubeTopPath = new Path2D(`M0,-${voxelSize}l${voxelDiagX},-${voxelDiagY}l-${voxelDiagX},-${voxelDiagY}l-${voxelDiagX},${voxelDiagY}Z`);
            const cubeRightPath = new Path2D(`M0,0l0,-${voxelSize}l${voxelDiagX},-${voxelDiagY}l0,${voxelSize}Z`);
            const cubeLeftPath = new Path2D(`M0,0l0,-${voxelSize}l-${voxelDiagX},-${voxelDiagY}l0,${voxelSize}Z`);
            context.fillStyle = '#FFFFFF';
            context.font = 'Arial 12px';
            context.fillText('id ' + i, 4, 10);
            context.strokeStyle = '#FFFFFF44';
            context.lineWidth = 1;
            for (let z = 0; z < modelSizes[i][2]; z++) {
              for (let y = modelSizes[i][1] - 1; y >= 0; y--) {
                for (let x = modelSizes[i][0] - 1; x >= 0; x--) {
                  const index = x + y * modelSizes[i][0] + z * modelSizes[i][0] * modelSizes[i][1];
                  const colorId = modelGrids[i][index];
                  if (colorId !== undefined) {
                    const colorRGB = palette[colorId];
                    const colorRGBDarker1 = [Math.max(0, colorRGB[0] * 90 / 100), Math.max(0, colorRGB[1] * 90 / 100), Math.max(0, colorRGB[2] * 90 / 100)];
                    const colorRGBDarker2 = [Math.max(0, colorRGB[0] * 75 / 100), Math.max(0, colorRGB[1] * 75 / 100), Math.max(0, colorRGB[2] * 75 / 100)];
                    context.save();
                    context.translate(100, 200);
                    context.translate(x * voxelDiagX - y * voxelDiagX, x * -voxelDiagY + y * -voxelDiagY - z * voxelSize);
                    context.fillStyle = 'rgb(' + colorRGBDarker2[0] + ',' + colorRGBDarker2[1] + ',' + colorRGBDarker2[2] + ')';
                    context.fill(cubeRightPath);
                    context.fillStyle = 'rgb(' + colorRGBDarker1[0] + ',' + colorRGBDarker1[1] + ',' + colorRGBDarker1[2] + ')';
                    context.fill(cubeLeftPath);
                    context.fillStyle = 'rgb(' + colorRGB[0] + ',' + colorRGB[1] + ',' + colorRGB[2] + ')';
                    context.fill(cubeTopPath);
                    context.restore();
                  }
                }
              }
            }
          }
        } catch {
          // ignored
        }
        try {
          sceneGraphContainer.innerHTML = recurseSceneGraph(nodes, nodes[0], '');
        } catch {
          // ignored
        }
      } else {
        outputText += 'Not a valid VOX file!';
      }
      outputContainer.innerHTML = outputText;
    };
    reader.readAsArrayBuffer(file);
  });
}, false);

function recurseSceneGraph(nodes, node) {
  let nodeText = 'id ' + node.id + ' [' + node.type + ']<br/>properties: ' + node.properties;
  if (node.type === 'SHP') {
    for (let i = 0; i < node.modelIds.length; i++) {
      nodeText += '<br/>model: id ' + node.modelIds[i] + ' ' + node.modelProperties[i];
    }
    return nodeText;
  } else if (node.type === 'TRN') {
    nodeText += '<br/>layer id: ' + node.layerId;
    nodeText += '<br/>frame properties: ' + node.frameProperties;
  }
  let sceneGraphText = '<table class="table table-bordered table-dark"><tbody><tr><td>' + nodeText + '</td><td>';
  for (let i = 0; i < node.childIds.length; i++) {
    sceneGraphText += recurseSceneGraph(nodes, nodes[node.childIds[i]]);
  }
  sceneGraphText += '</td></tr></tbody></table>';
  return sceneGraphText;
}
