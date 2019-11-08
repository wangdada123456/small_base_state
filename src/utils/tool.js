import $ from 'jquery'

// 根据数据计算最大宽度
export function getColMaxWidth(val,maxColWidth=500,fontSize=14){
  let tempEle = $('<span id="col-max-width"></span>');
  tempEle.css({fontSize:fontSize+'px',position:'fixed',left:'0',top:'0',opacity:'0'});
  $('body').after(tempEle)
  let width = 0;
  val.forEach(value=>{
    let newWidth = tempEle.text(value).width();
    if( width < newWidth && newWidth <= maxColWidth ){
      width = newWidth;
    }else if( newWidth > maxColWidth ){
      width = maxColWidth;
    }
  });
  tempEle.remove();
  return width;
}
// 根据数据计算最大宽度
export function getColMaxWidthArray(col=[],data=[[]],maxColWidth=500,padding=15,fontSize=14){
  let colWidthArr = [];
  // 遍历表头，处理表头对应的列数据
  col.forEach((value,index)=>{
    // 把每列的数据加上表头作为一个数组传给getColMaxWidth,获取该数组中最宽的数值，并加上30的padding值
    colWidthArr[index] = getColMaxWidth( data.map(arr=>{
      return arr[index] ? arr[index] : []
    }).concat(value), maxColWidth, fontSize ) + padding * 2;

  })
  return colWidthArr;

}


