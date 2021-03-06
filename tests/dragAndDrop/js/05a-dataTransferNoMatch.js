
var dragObject = new function () {
	var me = this;
	
	var targetNode; 
	var eventNoticeNode, dragEventNoticeNode;
	me.init = function () {
	
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}	
		
		
		targetNode=document.getElementById('dropTarget');
		eventNoticeNode = document.getElementById('eventNotice');
		dragEventNoticeNode = document.getElementById('dragEventNotice');
		
		/* These are events for the draggable objects */
		var dragNodes = cssQuery('[draggable=true]');
		for (var i = 0; i < dragNodes.length; i++) {
			var  dragNode=dragNodes[i]
			EventHelpers.addEvent(dragNode, 'dragstart', dragStartEvent);
		}
		
		/* These are events for the object to be dropped */
		EventHelpers.addEvent(targetNode, 'dragover', dragOverEvent);
		EventHelpers.addEvent(targetNode, 'drop', dropEvent);
	}
	
	function dragStartEvent(e) {
		e.dataTransfer.effectAllowed="copy"; 
		
		e.dataTransfer.setData('Text',
			sprintf('<img src="%s" alt="%s" /><br /><p class="caption">%s</p>',
				this.src, this.alt, this.alt
			)
		);
	}
	
	
	function dragOverEvent(e) {
		var node =  EventHelpers.getEventTarget(e);
		e.dataTransfer.dropEffect = "move";
		EventHelpers.preventDefault(e);
	}
	
	
	function dropEvent(e) {
		this.innerHTML = e.dataTransfer.getData('Text');
		
		EventHelpers.preventDefault(e);
	}
}

// fixes visual cues in IE and Chrome 3.0 and lower.
DragDropHelpers.fixVisualCues=true;

EventHelpers.addPageLoadEvent('dragObject.init');
