class WordCloudApp {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.shapeSelect = document.getElementById('shapeSelect');
        this.wordcloudCanvas = document.getElementById('wordcloudCanvas');
        this.wordcloudContainer = document.getElementById('wordcloudContainer');
        this.emptyState = document.getElementById('emptyState');
        this.historyList = document.getElementById('historyList');
        
        this.currentWordCloudData = null;
        this.storageKey = 'wordcloud_history';
        
        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateWordCloud());
        this.clearBtn.addEventListener('click', () => this.clearText());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.shapeSelect.addEventListener('change', () => {
            if (this.currentWordCloudData) {
                this.renderWordCloud(this.currentWordCloudData.wordList);
            }
        });
        
        this.loadHistory();
    }

    getShapeFunction(shapeName) {
        const shapes = {
            circle: 'circle',
            cardioid: 'cardioid',
            star: (theta) => {
                const n = 5;
                const outerRadius = 1;
                const innerRadius = 0.4;
                const angle = (theta / (2 * Math.PI)) * n * 2;
                const radius = angle % 2 < 1 ? outerRadius : innerRadius;
                return radius;
            },
            square: (theta) => {
                const angle = theta % (2 * Math.PI);
                if (angle < Math.PI / 4 || angle > 7 * Math.PI / 4) return 1 / Math.cos(angle);
                if (angle < 3 * Math.PI / 4) return 1 / Math.sin(angle);
                if (angle < 5 * Math.PI / 4) return -1 / Math.cos(angle);
                return -1 / Math.sin(angle);
            },
            diamond: (theta) => {
                const angle = theta % (2 * Math.PI);
                return 1 / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
            },
            triangle: (theta) => {
                const angle = theta % (2 * Math.PI);
                const segment = Math.floor(angle / (2 * Math.PI / 3));
                const segmentAngle = angle - segment * (2 * Math.PI / 3);
                return 1 / Math.cos(segmentAngle - Math.PI / 3);
            },
            pentagon: (theta) => {
                const n = 5;
                const angle = theta % (2 * Math.PI);
                const segment = Math.floor(angle / (2 * Math.PI / n));
                const segmentAngle = angle - segment * (2 * Math.PI / n);
                return 1 / Math.cos(segmentAngle - Math.PI / n);
            }
        };
        
        return shapes[shapeName] || 'circle';
    }

    segmentText(text) {
        const stopWords = new Set([
            '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这', '那', '他', '她', '它', '们', '为', '与', '及', '而', '或', '等', '被', '从', '以', '对', '于', '把', '让', '给', '向', '往', '跟', '比', '将', '可以', '能', '会', '应该', '必须', '可能', '已经', '正在', '曾经',
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'is', 'are', 'was', 'were', 'been', 'has', 'had', 'can', 'could', 'may', 'might', 'should', 'would'
        ]);

        text = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ');
        
        const words = [];
        const chineseRegex = /[\u4e00-\u9fa5]+/g;
        const englishRegex = /[a-zA-Z]+/g;
        
        let match;
        while ((match = chineseRegex.exec(text)) !== null) {
            const word = match[0];
            if (word.length >= 2) {
                for (let i = 0; i <= word.length - 2; i++) {
                    words.push(word.substr(i, 2));
                }
                if (word.length >= 3) {
                    for (let i = 0; i <= word.length - 3; i++) {
                        words.push(word.substr(i, 3));
                    }
                }
                if (word.length >= 4) {
                    for (let i = 0; i <= word.length - 4; i++) {
                        words.push(word.substr(i, 4));
                    }
                }
            }
        }
        
        while ((match = englishRegex.exec(text)) !== null) {
            const word = match[0].toLowerCase();
            if (word.length >= 3 && !stopWords.has(word)) {
                words.push(word);
            }
        }

        const wordFreq = {};
        words.forEach(word => {
            if (!stopWords.has(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });

        return Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 150);
    }

    generateWordCloud() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            alert('请输入文字内容！');
            return;
        }

        const wordList = this.segmentText(text);
        
        if (wordList.length === 0) {
            alert('未能提取到有效词汇，请输入更多内容！');
            return;
        }

        this.currentWordCloudData = {
            text: text,
            wordList: wordList,
            timestamp: Date.now()
        };

        this.renderWordCloud(wordList);
        this.downloadBtn.disabled = false;
        this.saveToHistory();
    }

    renderThumbnailWordCloud(itemId, wordList) {
        const canvas = document.querySelector(`.history-canvas[data-id="${itemId}"]`);
        if (!canvas) {
            console.log('Canvas not found for id:', itemId);
            return;
        }

        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

        const maxFreq = wordList[0][1];
        const minFreq = wordList[wordList.length - 1][1];
        const range = maxFreq - minFreq || 1;

        const list = wordList.map(([word, freq]) => {
            const normalizedSize = ((freq - minFreq) / range) * 20 + 8;
            return [word, normalizedSize];
        });

        canvas.width = 280;
        canvas.height = 180;

        WordCloud(canvas, {
            list: list,
            gridSize: 3,
            weightFactor: 1,
            fontFamily: 'Microsoft YaHei, Arial, sans-serif',
            color: () => colors[Math.floor(Math.random() * colors.length)],
            rotateRatio: 0.3,
            rotationSteps: 2,
            backgroundColor: '#fafafa',
            drawOutOfBound: false,
            minSize: 6,
            shape: 'circle'
        });
    }

    renderWordCloud(wordList) {
        this.emptyState.style.display = 'none';
        
        const maxFreq = wordList[0][1];
        const minFreq = wordList[wordList.length - 1][1];
        const range = maxFreq - minFreq || 1;

        const list = wordList.map(([word, freq]) => {
            const normalizedSize = ((freq - minFreq) / range) * 80 + 20;
            return [word, normalizedSize];
        });

        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

        const containerRect = this.wordcloudContainer.getBoundingClientRect();
        const scale = 4;
        this.wordcloudCanvas.width = containerRect.width * scale;
        this.wordcloudCanvas.height = containerRect.height * scale;
        this.wordcloudCanvas.style.width = containerRect.width + 'px';
        this.wordcloudCanvas.style.height = containerRect.height + 'px';

        const selectedShape = this.shapeSelect.value;
        const shapeFunction = this.getShapeFunction(selectedShape);

        WordCloud(this.wordcloudCanvas, {
            list: list,
            gridSize: 2,
            weightFactor: scale * 1.5,
            fontFamily: 'Microsoft YaHei, Arial, sans-serif',
            color: () => colors[Math.floor(Math.random() * colors.length)],
            rotateRatio: 0.3,
            rotationSteps: 2,
            backgroundColor: '#fafafa',
            drawOutOfBound: false,
            minSize: 8,
            shape: shapeFunction
        });
    }

    clearText() {
        this.textInput.value = '';
        this.textInput.focus();
    }

    downloadImage() {
        try {
            // 直接使用 WordCloud.js 生成的高分辨率 canvas
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            link.download = `wordcloud-${timestamp}.png`;
            link.href = this.wordcloudCanvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (error) {
            console.error('下载失败:', error);
            alert('图片下载失败，请重试！');
        }
    }

    saveToHistory() {
        try {
            // 创建缩略图 canvas
            const thumbnailCanvas = document.createElement('canvas');
            const thumbnailCtx = thumbnailCanvas.getContext('2d');
            thumbnailCanvas.width = 200;
            thumbnailCanvas.height = 130;
            
            // 绘制缩放后的词云到缩略图
            thumbnailCtx.drawImage(this.wordcloudCanvas, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
            
            const thumbnail = thumbnailCanvas.toDataURL('image/jpeg', 0.5);
            
            const historyItem = {
                id: Date.now(),
                text: this.currentWordCloudData.text,
                wordList: this.currentWordCloudData.wordList,
                thumbnail: thumbnail,
                timestamp: this.currentWordCloudData.timestamp
            };

            let history = this.getHistory();
            history.unshift(historyItem);
            
            if (history.length > 20) {
                history = history.slice(0, 20);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(history));
            
            this.loadHistory();
        } catch (error) {
            console.error('保存历史失败:', error);
        }
    }

    getHistory() {
        try {
            const history = localStorage.getItem(this.storageKey);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('读取历史失败:', error);
            return [];
        }
    }

    loadHistory() {
        const history = this.getHistory();
        
        if (history.length === 0) {
            this.historyList.innerHTML = '<div class="empty-state"><p>暂无历史记录</p></div>';
            return;
        }

        this.historyList.innerHTML = history.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-thumbnail">
                    <canvas class="history-canvas" data-id="${item.id}"></canvas>
                </div>
                <div class="history-info">
                    <div class="history-time">${this.formatTime(item.timestamp)}</div>
                    <div class="history-text">${item.text}</div>
                    <div class="history-actions">
                        <button class="btn btn-primary btn-load">加载</button>
                        <button class="btn btn-danger btn-delete">删除</button>
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(() => {
            history.forEach(item => {
                this.renderThumbnailWordCloud(item.id, item.wordList);
            });
        }, 100);

        document.querySelectorAll('.btn-load').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.target.closest('.history-item').dataset.id);
                this.loadHistoryItem(id);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.target.closest('.history-item').dataset.id);
                this.deleteHistoryItem(id);
            });
        });
    }

    loadHistoryItem(id) {
        const history = this.getHistory();
        const item = history.find(h => h.id === id);
        
        if (item) {
            this.textInput.value = item.text;
            this.currentWordCloudData = {
                text: item.text,
                wordList: item.wordList,
                timestamp: item.timestamp
            };

            this.renderWordCloud(item.wordList);
            this.downloadBtn.disabled = false;
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    deleteHistoryItem(id) {
        if (!confirm('确定要删除这条历史记录吗？')) {
            return;
        }

        let history = this.getHistory();
        history = history.filter(h => h.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(history));
        
        this.loadHistory();
    }

    clearHistory() {
        if (!confirm('确定要清空所有历史记录吗？此操作不可恢复！')) {
            return;
        }

        localStorage.removeItem(this.storageKey);
        this.loadHistory();
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return '刚刚';
        if (minutes < 60) return `${minutes}分钟前`;
        if (hours < 24) return `${hours}小时前`;
        if (days < 7) return `${days}天前`;
        
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WordCloudApp();
});
