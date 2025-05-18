// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // 网站内容数据（在实际应用中，这可能来自API或后端）
    const siteContent = [
        {
            title: '首页',
            url: 'index.html',
            content: '欢迎来到我的个人网站。这是一个展示我的技能、项目和想法的地方。'
        },
        {
            title: '关于我',
            url: 'about.html',
            content: '我是一名热爱技术的开发者，擅长前端和后端开发。我喜欢创造有用的应用和解决问题。'
        },
        {
            title: '项目一',
            url: 'portfolio.html#project1',
            content: '这是我的第一个项目描述。这个项目展示了我的技能和创意。'
        },
        {
            title: '项目二',
            url: 'portfolio.html#project2',
            content: '这是我的第二个项目描述。这个项目展示了我的技能和创意。'
        },
        {
            title: '项目三',
            url: 'portfolio.html#project3',
            content: '这是我的第三个项目描述。这个项目展示了我的技能和创意。'
        },
        {
            title: '博客文章标题一',
            url: 'blog.html#post1',
            content: '这是博客文章的摘要。这篇文章讨论了前端开发的最新趋势。'
        },
        {
            title: '博客文章标题二',
            url: 'blog.html#post2',
            content: '这是博客文章的摘要。这篇文章分享了我的学习经验和技巧。'
        },
        {
            title: '联系我',
            url: 'contact.html',
            content: '如果您有任何问题或合作意向，请随时联系我。'
        }
    ];
    
    // 搜索函数
    function performSearch(query) {
        // 清空之前的结果
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (!query.trim()) return;
        
        const results = siteContent.filter(item => {
            return (
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
            );
        });
        
        if (results.length > 0) {
            searchResults.style.display = 'block';
            
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                // 高亮匹配的文本
                const highlightedTitle = highlightText(result.title, query);
                const highlightedContent = highlightText(result.content, query);
                
                resultItem.innerHTML = `
                    <h3><a href="${result.url}">${highlightedTitle}</a></h3>
                    <p>${highlightedContent}</p>
                `;
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'block';
            searchResults.innerHTML = '<div class="search-result-item">没有找到匹配的结果</div>';
        }
    }
    
    // 高亮文本函数
    function highlightText(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // 转义正则表达式特殊字符
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    // 点击其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && 
            !searchButton.contains(e.target) && 
            !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // 输入框获得焦点时，如果有内容则显示结果
    searchInput.addEventListener('focus', function() {
        if (searchInput.value.trim() && searchResults.children.length > 0) {
            searchResults.style.display = 'block';
        }
    });
});