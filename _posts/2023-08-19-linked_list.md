---
layout: post
title: Linked List
subtitle: A linked list is a linear data structure.
date: 2023-08-19
author: Winchell.Wang
header-img: "img/post-bg-tech.jpg"
tags:
   - Computer
header-mask: 0.1
catalog: true
---

# Singly Linked List

A singly linked list is a linear collection of data elements that can only be traversed in one direction. Each node has a 'value' field and a 'next' field. The value field stores any type of value, and the next field points to the next node. The linked list will return 'None' after the last node.

![Singly_linked_list](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg)

# Python Code

Create Singly Linked List

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        return self.val

class LinkedList:
    def __init__(self, nodes=None):
        self.val = None
        if nodes is not None:
            node = ListNode(val=nodes.pop(0))
            self.val = node
            for elem in nodes:
                node.next = ListNode(val=elem)
                node = node.next

    def __repr__(self):
        node = self.val
        nodes = []
        while node is not None:
            nodes.append(node.val)
            node = node.next
        nodes.append("None")
        return " -> ".join(nodes)

    def __iter__(self):
        node = self.val
        while node is not None:
            yield node
            node = node.next

# build a single linked list

list = LinkedList(["12", "99", "37"])
list
# output

# 12 -> 99 -> 37 -> None


# loop to extract elements in list

for node in list:
   print(node)
# output

# 12

# 99

# 37


# current node and move to next node

node = list.val
print(node)
node = node.next
print(node)
# output

# 12

# 99


# return after the last node

node = list.val.next.next.next
print(node)
# output

# None
```