# 排序算法

## 冒泡排序

原理：比较两个相邻的元素，将值大的元素放到后面
思路：依次比较相邻的两个数，小的放前面，大的放后面。

```javascript
function bubbleSort(arr) {
  // 外层，需要遍历的次数
  for (let i = 1; i < arr.length; i++) {
    // 内层，每次比较
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}
```

## 插入排序
原理：为当前元素保存一个副本，依次向前遍历前面的元素是否比自己大，如果比自己大就直接把前一个元素赋值到当前元素的位置，当前某位置的元素不再比当前元素大的时候，将当前元素的值赋值到这个位置。
```javascript
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j,
      temp = arr[i];
    for (j = i; j > 0 && arr[j - 1] > temp; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
}
```

## 快速排序
原理：找一个基准值将数组分割成两部分，大的放后面，小的放前面
思路：
1．先从数列中取出一个数作为基准数。
2．分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
3．再对左右区间重复第二步，直到各区间只有一个数。
```javascript
function swap(nums, p, q) {
  const temp = nums[p]
  nums[p] = nums[q]
  nums[q] = temp
}
function randomQuickSort(arr,l,r) {
  if (l >= r) return
  let random = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, random, l)
  let left = l,
    right = r,
    pivot = arr[left]
  while (left < right) {
    while (left < right && arr[right] >= pivot) right--
    if (left < right && arr[right] < pivot) arr[left] = arr[right]
    while (left < right && arr[left] <= pivot) left++
    if (left < right && arr[left] > pivot) arr[right] = arr[left]
    if (left >= right) arr[left] = pivot
  }
  randomQuickSort(arr, l, right - 1)
  randomQuickSort(arr, right + 1, r)
  return arr
}
```
## 归并排序
